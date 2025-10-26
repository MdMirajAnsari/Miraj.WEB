import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample blog data - replace with your actual blog posts or fetch from API
  const blogPosts = {
    1: {
      id: 1,
      title: 'Building Scalable Web Applications with React',
      excerpt:
        'Explore best practices for creating maintainable and scalable React applications using modern patterns and tools.',
      date: 'Jan 15, 2024',
      category: 'Web Development',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      author: 'Miraj',
      content: `
        <h2>Introduction</h2>
        <p>Building scalable web applications is crucial in today's fast-paced development environment. React has become the go-to library for creating interactive user interfaces, but scaling a React application requires careful planning and adherence to best practices.</p>
        
        <h2>Component Architecture</h2>
        <p>One of the key aspects of building scalable React applications is establishing a solid component architecture. This includes:</p>
        <ul>
          <li>Creating reusable, single-responsibility components</li>
          <li>Implementing proper state management strategies</li>
          <li>Using composition over inheritance</li>
          <li>Establishing clear component hierarchies</li>
        </ul>
        
        <h2>State Management</h2>
        <p>As your application grows, managing state becomes increasingly complex. Consider using state management solutions like Redux, Zustand, or React Context API based on your application's needs.</p>
        
        <h2>Performance Optimization</h2>
        <p>Performance is critical for scalability. Implement techniques such as:</p>
        <ul>
          <li>Code splitting and lazy loading</li>
          <li>Memoization with useMemo and useCallback</li>
          <li>Virtual scrolling for large lists</li>
          <li>Optimizing bundle size</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Building scalable React applications requires a combination of good architecture, proper state management, and performance optimization. By following these practices, you can create applications that grow with your needs.</p>
      `,
    },
    2: {
      id: 2,
      title: "The Future of JavaScript: What's Coming in ES2024",
      excerpt:
        'A deep dive into the latest JavaScript features and how they will change the way we write code.',
      date: 'Jan 10, 2024',
      category: 'JavaScript',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
      author: 'Miraj',
      content: `
        <h2>What's New in ES2024</h2>
        <p>JavaScript continues to evolve with exciting new features that make development more efficient and enjoyable. Let's explore what's coming in ES2024.</p>
        
        <h2>New Array Methods</h2>
        <p>ES2024 introduces powerful new array methods that simplify common operations:</p>
        <ul>
          <li>Array.prototype.toSorted() - Non-mutating sort</li>
          <li>Array.prototype.toReversed() - Non-mutating reverse</li>
          <li>Array.prototype.with() - Non-mutating element replacement</li>
        </ul>
        
        <h2>Pattern Matching</h2>
        <p>Pattern matching brings powerful capabilities from functional programming languages to JavaScript, making complex conditional logic more readable and maintainable.</p>
        
        <h2>Temporal API</h2>
        <p>The new Temporal API provides a modern approach to working with dates and times, addressing many of the issues with the legacy Date object.</p>
        
        <h2>Looking Ahead</h2>
        <p>These features represent just the beginning. JavaScript's evolution continues to focus on developer experience and performance.</p>
      `,
    },
    3: {
      id: 3,
      title: 'Mastering TypeScript for Better Code Quality',
      excerpt:
        'Learn how TypeScript can help you write more robust code and catch bugs before they reach production.',
      date: 'Jan 5, 2024',
      category: 'TypeScript',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      author: 'Miraj',
      content: `
        <h2>Why TypeScript?</h2>
        <p>TypeScript has revolutionized the way we write JavaScript by adding static typing, which catches errors at compile time rather than runtime.</p>
        
        <h2>Type Safety Benefits</h2>
        <p>Type safety provides numerous advantages:</p>
        <ul>
          <li>Early error detection during development</li>
          <li>Better IDE support with autocomplete and refactoring</li>
          <li>Self-documenting code through type annotations</li>
          <li>Easier maintenance and collaboration</li>
        </ul>
        
        <h2>Advanced TypeScript Features</h2>
        <p>Master these advanced features to unlock TypeScript's full potential:</p>
        <ul>
          <li>Generic types for reusable components</li>
          <li>Utility types like Partial, Pick, and Omit</li>
          <li>Conditional types for complex logic</li>
          <li>Template literal types</li>
        </ul>
        
        <h2>Best Practices</h2>
        <p>Follow these best practices to get the most out of TypeScript:</p>
        <ul>
          <li>Use strict mode for maximum type safety</li>
          <li>Avoid using 'any' type when possible</li>
          <li>Leverage type inference</li>
          <li>Create custom type guards</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>TypeScript is more than just adding types to JavaScript. It's a tool that helps you write better, more maintainable code and catch bugs before they become problems.</p>
      `,
    },
  };

  const blog = blogPosts[id];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <h2 className="text-4xl font-beckman font-bold text-white mb-4">
            Blog Not Found
          </h2>
          <button
            onClick={() => navigate('/blog')}
            className="bg-night text-white px-6 py-3 rounded-lg font-poppins hover:bg-night/80 transition">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-[120px] pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-taupe hover:text-white transition-colors mb-8 font-poppins">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Blog
        </motion.button>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-[400px] rounded-[20px] overflow-hidden mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4">
          <span className="px-4 py-2 bg-battleGray rounded-full text-[14px] font-bold text-white uppercase tracking-wider">
            {blog.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-beckman font-bold text-white text-[42px] sm:text-[52px] leading-tight mb-6">
          {blog.title}
        </motion.h1>

        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-6 text-taupe text-[14px] font-poppins mb-8 pb-8 border-b border-taupe/30">
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                fill="currentColor"
              />
              <path
                d="M10 12C4.477 12 0 14.686 0 18V20H20V18C20 14.686 15.523 12 10 12Z"
                fill="currentColor"
              />
            </svg>
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18Z"
                fill="currentColor"
              />
              <path d="M11 5H9V11L14 14L15 12.5L11 10V5Z" fill="currentColor" />
            </svg>
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 4C2 2.895 2.895 2 4 2H16C17.105 2 18 2.895 18 4V16C18 17.105 17.105 18 16 18H4C2.895 18 2 17.105 2 16V4Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M6 8H14M6 12H14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{blog.readTime} min read</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-beckman prose-headings:text-white
            prose-h2:text-[32px] prose-h2:mb-4 prose-h2:mt-8
            prose-p:text-taupe prose-p:text-[18px] prose-p:leading-[32px] prose-p:mb-6 prose-p:font-poppins
            prose-ul:text-taupe prose-ul:text-[18px] prose-ul:leading-[32px] prose-ul:font-poppins
            prose-li:mb-2
            prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-taupe/30">
          <p className="text-taupe text-[16px] font-poppins mb-4">
            Share this article:
          </p>
          <div className="flex gap-4">
            <button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`,
                  '_blank'
                )
              }
              className="bg-battleGray hover:bg-battleGray/80 text-white px-6 py-3 rounded-lg font-poppins transition">
              Twitter
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                  '_blank'
                )
              }
              className="bg-battleGray hover:bg-battleGray/80 text-white px-6 py-3 rounded-lg font-poppins transition">
              LinkedIn
            </button>
            <button
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                  '_blank'
                )
              }
              className="bg-battleGray hover:bg-battleGray/80 text-white px-6 py-3 rounded-lg font-poppins transition">
              Facebook
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
