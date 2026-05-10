import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { blogPosts } from '../constants/blogData';
import { toRawMarkdownUrl } from '../utils/markdown';

const favoriteStorageKey = 'miraj-blog-favorites';
const recentStorageKey = 'miraj-blog-recently-viewed';

const readStoredArray = (key) => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const writeStoredArray = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const getPostTags = (post) => {
  const text = `${post.title} ${post.category} ${post.excerpt} ${post.content || ''}`.toLowerCase();
  const tags = new Set(post.tags || []);

  [
    ['Angular', 'angular'],
    ['RxJS', 'rxjs'],
    ['Interview', 'interview'],
    ['C#', 'c#'],
    ['.NET', '.net'],
    ['SQL', 'sql'],
    ['React', 'react'],
    ['JavaScript', 'javascript'],
    ['TypeScript', 'typescript'],
    ['CSS', 'css'],
    ['System Design', 'system design'],
    ['Architecture', 'architecture'],
    ['Git', 'git'],
  ].forEach(([tag, token]) => {
    if (text.includes(token)) {
      tags.add(tag);
    }
  });

  return [...tags].slice(0, 5);
};

const extractHeadings = (markdown) => {
  const headings = [];
  const usedSlugs = new Map();
  const headingPattern = /^(#{2,3})\s+(.+)$/gm;
  let match = headingPattern.exec(markdown);

  while (match) {
    const rawText = match[2].replace(/[`*_#[\]]/g, '').trim();
    const baseSlug = slugify(rawText);
    const count = usedSlugs.get(baseSlug) || 0;
    usedSlugs.set(baseSlug, count + 1);

    headings.push({
      id: count === 0 ? baseSlug : `${baseSlug}-${count + 1}`,
      text: rawText,
      level: match[1].length,
    });

    match = headingPattern.exec(markdown);
  }

  return headings;
};

const CopyableCode = ({ inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="relative group my-6">
      <button
        type="button"
        onClick={copyCode}
        className="absolute right-3 top-3 z-10 rounded-md border border-white/10 bg-black/60 px-3 py-1 text-xs text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-4 text-sm leading-7 text-gray-100">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
};

CopyableCode.propTypes = {
  inline: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

CopyableCode.defaultProps = {
  inline: false,
  className: '',
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogPosts[id];
  const [content, setContent] = useState(blog?.content || '');
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [contentError, setContentError] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredArray(favoriteStorageKey));
  const [copiedLink, setCopiedLink] = useState(false);

  const posts = useMemo(
    () =>
      Object.values(blogPosts).map((post) => ({
        ...post,
        tags: getPostTags(post),
      })),
    [],
  );

  const enrichedBlog = useMemo(
    () => (blog ? { ...blog, tags: getPostTags(blog) } : null),
    [blog],
  );

  const headings = useMemo(() => extractHeadings(content), [content]);

  const relatedPosts = useMemo(() => {
    if (!enrichedBlog) {
      return [];
    }

    return posts
      .filter((post) => post.id !== enrichedBlog.id)
      .map((post) => {
        const sharedTags = post.tags.filter((tag) => enrichedBlog.tags.includes(tag)).length;
        const categoryScore = post.category === enrichedBlog.category ? 2 : 0;
        return { ...post, score: sharedTags + categoryScore };
      })
      .filter((post) => post.score > 0)
      .sort((firstPost, secondPost) => secondPost.score - firstPost.score)
      .slice(0, 3);
  }, [enrichedBlog, posts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!blog) {
      return;
    }

    const nextRecentIds = [blog.id, ...readStoredArray(recentStorageKey).filter((recentId) => recentId !== blog.id)].slice(0, 6);
    writeStoredArray(recentStorageKey, nextRecentIds);
  }, [blog]);

  useEffect(() => {
    if (!blog) return undefined;

    setContent(blog.content || '');
    setContentError('');

    if (!blog.markdownUrl) return undefined;

    const controller = new AbortController();

    const loadMarkdown = async () => {
      setIsLoadingContent(true);

      try {
        const response = await fetch(toRawMarkdownUrl(blog.markdownUrl), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load markdown (${response.status})`);
        }

        setContent(await response.text());
      } catch (error) {
        if (error.name !== 'AbortError') {
          setContentError(error.message || 'Unable to load markdown');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingContent(false);
        }
      }
    };

    loadMarkdown();

    return () => controller.abort();
  }, [blog]);

  if (!enrichedBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-beckman font-bold text-white mb-4">
            Blog Not Found
          </h2>
          <button
            onClick={() => navigate('/blog')}
            className="glass-button text-white px-6 py-3 rounded-lg font-poppins transition">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const isFavorite = favoriteIds.includes(enrichedBlog.id);

  const toggleFavorite = () => {
    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(enrichedBlog.id)
        ? currentIds.filter((currentId) => currentId !== enrichedBlog.id)
        : [enrichedBlog.id, ...currentIds];

      writeStoredArray(favoriteStorageKey, nextIds);
      return nextIds;
    });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 1600);
  };

  const markdownComponents = {
    code: CopyableCode,
    h2: ({ children }) => {
      const text = String(children);
      const heading = headings.find((item) => item.text === text);
      return (
        <h2 id={heading?.id} className="scroll-mt-28">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = String(children);
      const heading = headings.find((item) => item.text === text);
      return (
        <h3 id={heading?.id} className="scroll-mt-28">
          {children}
        </h3>
      );
    },
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20">
      <div className="fixed left-0 top-0 z-50 h-1 bg-indigo-400 transition-all duration-150" style={{ width: `${readingProgress}%` }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8 font-poppins">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Blog
        </motion.button>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
          <main className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card w-full h-[280px] sm:h-[420px] rounded-[20px] overflow-hidden mb-8 p-2">
              <img src={enrichedBlog.image} alt={enrichedBlog.title} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-[14px] font-bold text-white uppercase tracking-wider">
                {enrichedBlog.category}
              </span>
              {enrichedBlog.tags.map((tag) => (
                <span key={tag} className="px-3 py-2 bg-white/10 rounded-full text-[13px] text-gray-200">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-beckman font-bold text-white text-[36px] sm:text-[52px] leading-tight mb-6">
              {enrichedBlog.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 text-gray-400 text-[14px] font-poppins mb-8 pb-8 border-b border-gray-700">
              <span>{enrichedBlog.author}</span>
              <span>|</span>
              <span>{enrichedBlog.date}</span>
              <span>|</span>
              <span>{enrichedBlog.readTime} min read</span>
              <button type="button" onClick={toggleFavorite} className="glass-button text-white px-4 py-2 rounded-lg">
                {isFavorite ? 'Bookmarked' : 'Bookmark'}
              </button>
              <button type="button" onClick={copyLink} className="glass-button text-white px-4 py-2 rounded-lg">
                {copiedLink ? 'Copied link' : 'Copy link'}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card rounded-[20px] p-5 sm:p-8"
            >
              <div
                className="blog-markdown prose prose-invert prose-lg max-w-none
                  prose-headings:font-beckman prose-headings:text-white prose-headings:tracking-normal
                  prose-h2:text-[30px] prose-h2:mb-4 prose-h2:mt-10
                  prose-h3:text-[24px] prose-h3:mb-3 prose-h3:mt-8
                  prose-p:text-gray-100 prose-p:text-[18px] prose-p:leading-[34px] prose-p:mb-6 prose-p:font-poppins
                  prose-ul:text-gray-100 prose-ul:text-[18px] prose-ul:leading-[32px] prose-ul:font-poppins
                  prose-ol:text-gray-100 prose-ol:text-[18px] prose-ol:leading-[32px] prose-ol:font-poppins
                  prose-li:text-gray-100 prose-li:mb-2
                  prose-strong:text-white prose-a:text-indigo-300 prose-a:no-underline hover:prose-a:text-indigo-100
                  prose-code:text-indigo-100 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-transparent prose-pre:p-0"
              >
                {isLoadingContent && <p className="!text-gray-300">Loading markdown...</p>}
                {contentError && <p className="!text-red-300">{contentError}</p>}
                {!isLoadingContent && !contentError && (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
                    {content}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>

            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-white text-2xl font-beckman font-bold mb-5">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {relatedPosts.map((post) => (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="glass-card rounded-lg p-5 text-left hover:-translate-y-1 transition-transform"
                    >
                      <span className="text-xs text-indigo-300 uppercase font-bold">{post.category}</span>
                      <h3 className="mt-3 text-white font-semibold line-clamp-2">{post.title}</h3>
                      <p className="mt-3 text-gray-300 text-sm line-clamp-3">{post.excerpt}</p>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </main>

          <aside className="xl:sticky xl:top-24 space-y-6">
            {headings.length > 0 && (
              <section className="glass-card rounded-lg p-5">
                <h2 className="text-white text-lg font-semibold mb-4">Contents</h2>
                <nav className="space-y-3">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm hover:text-white transition-colors ${
                        heading.level === 3 ? 'pl-4 text-gray-400' : 'text-gray-300'
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </section>
            )}

            <section className="glass-card rounded-lg p-5">
              <h2 className="text-white text-lg font-semibold mb-4">Share</h2>
              <div className="flex flex-col gap-3">
                <button type="button" onClick={copyLink} className="glass-button text-white px-4 py-3 rounded-lg text-left">
                  {copiedLink ? 'Copied link' : 'Copy link'}
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${enrichedBlog.title}&url=${window.location.href}`, '_blank')}
                  className="glass-button text-white px-4 py-3 rounded-lg text-left">
                  Twitter
                </button>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                  className="glass-button text-white px-4 py-3 rounded-lg text-left">
                  LinkedIn
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
