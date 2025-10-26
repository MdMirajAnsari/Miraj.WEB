import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import { blogPosts } from '../constants/blogData';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
