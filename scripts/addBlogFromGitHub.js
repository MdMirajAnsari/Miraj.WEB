#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to fetch content from GitHub raw URL
function fetchGitHubContent(url) {
  return new Promise((resolve, reject) => {
    const rawUrl = url
      .replace('github.com', 'raw.githubusercontent.com')
      .replace('/blob/', '/');

    https.get(rawUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Function to extract title from markdown
function extractTitle(markdown) {
  const titleMatch = markdown.match(/^#\s+(.+?)$/m);
  return titleMatch ? titleMatch[1].trim() : 'Untitled';
}

// Function to extract excerpt from markdown (first paragraph)
function extractExcerpt(markdown) {
  const lines = markdown.split('\n');
  let excerpt = '';
  for (const line of lines) {
    if (line.trim() && !line.startsWith('#') && !line.startsWith('*') && !line.startsWith('-')) {
      excerpt = line.trim().substring(0, 150);
      if (excerpt.length === 150) excerpt += '...';
      break;
    }
  }
  return excerpt || 'No description available';
}

// Function to estimate read time
function estimateReadTime(content) {
  const wordCount = content.split(/\s+/).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function escapeDoubleQuotes(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Function to format the new blog post entry
function formatBlogEntry(id, title, excerpt, date, readTime, markdownUrl) {
  return `  ${id}: {
    id: ${id},
    title: "${escapeDoubleQuotes(title)}",
    excerpt:
      "${escapeDoubleQuotes(excerpt)}",
    date: "${date}",
    category: "Tutorial",
    readTime: ${readTime},
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    author: "Miraj",
    markdownUrl:
      "${escapeDoubleQuotes(markdownUrl)}",
  },`;
}

async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.error('❌ Please provide a GitHub URL');
    console.log('Usage: node addBlogFromGitHub.js <github-url>');
    console.log('Example: node addBlogFromGitHub.js https://github.com/user/repo/blob/main/file.md');
    process.exit(1);
  }

  if (!url.includes('github.com')) {
    console.error('❌ Please provide a valid GitHub URL');
    process.exit(1);
  }

  try {
    console.log('📥 Fetching content from GitHub...');
    const markdown = await fetchGitHubContent(url);
    
    if (!markdown) {
      console.error('❌ Could not fetch content from URL');
      process.exit(1);
    }

    const title = extractTitle(markdown);
    const excerpt = extractExcerpt(markdown);
    const readTime = estimateReadTime(markdown);
    const today = new Date();
    const date = `${today.toLocaleString('en-US', { month: 'short' })} ${today.getDate()}, ${today.getFullYear()}`;

    // Read blogData.js
    const blogDataPath = path.join(__dirname, '../src/constants/blogData.js');
    let blogDataContent = fs.readFileSync(blogDataPath, 'utf8');

    // Extract the next ID by finding the highest existing ID
    const idMatches = blogDataContent.match(/\s+(\d+):\s*\{/g);
    const nextId = idMatches 
      ? Math.max(...idMatches.map(match => parseInt(match.match(/\d+/)[0]))) + 1 
      : 1;

    // Format new entry. The app will fetch the Markdown when the blog opens.
    const newEntry = formatBlogEntry(nextId, title, excerpt, date, readTime, url);

    // Insert before the closing };
    const updatedContent = blogDataContent.replace(
      /\n\};\s*$/,
      `,\n${newEntry}\n\n};`
    );

    // Write back
    fs.writeFileSync(blogDataPath, updatedContent, 'utf8');

    console.log('✅ Blog post added successfully!');
    console.log(`📝 ID: ${nextId}`);
    console.log(`📋 Title: ${title}`);
    console.log(`⏱️  Read Time: ${readTime} min`);
    console.log(`📅 Date: ${date}`);
    console.log(`📍 File: src/constants/blogData.js`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
