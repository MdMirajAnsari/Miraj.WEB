import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

const BlogCard = ({ id, title, excerpt, date, category, readTime, image, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
      className="relative w-full sm:w-[350px] h-[450px] rounded-[20px] overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/blog/${id}`)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-transparent" />
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-primary rounded-full text-[12px] font-bold text-night uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        {/* Date & Read Time */}
        <div className="flex items-center gap-3 mb-3 text-silver text-[12px] font-poppins">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Title */}
        <h3
          className={`font-beckman font-bold text-timberWolf text-[22px] leading-[28px] mb-3 transition-colors duration-300 ${
            isHovered ? 'text-primary' : ''
          }`}>
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-taupe text-[14px] leading-[20px] font-poppins line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Read More Link */}
        <div
          className={`flex items-center gap-2 text-[14px] font-beckman font-bold transition-all duration-300 ${
            isHovered ? 'text-primary translate-x-2' : 'text-silver'
          }`}>
          <span>READ MORE</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </motion.div>
  );
};

BlogCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  readTime: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const Blog = () => {
  // Sample blog data - replace with your actual blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'C# Concepts - Complete Guide',
      excerpt:
        'Comprehensive guide covering C# fundamentals, advanced features, threading, async programming, and best practices for .NET developers.',
      date: 'Jan 26, 2024',
      category: 'C# / .NET',
      readTime: 45,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications with React',
      excerpt:
        'Explore best practices for creating maintainable and scalable React applications using modern patterns and tools.',
      date: 'Jan 15, 2024',
      category: 'Web Development',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    },
    {
      id: 3,
      title: 'The Future of JavaScript: What\'s Coming in ES2024',
      excerpt:
        'A deep dive into the latest JavaScript features and how they will change the way we write code.',
      date: 'Jan 10, 2024',
      category: 'JavaScript',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    },
    {
      id: 4,
      title: 'Mastering TypeScript for Better Code Quality',
      excerpt:
        'Learn how TypeScript can help you write more robust code and catch bugs before they reach production.',
      date: 'Jan 5, 2024',
      category: 'TypeScript',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    },
  ];

  return (
    <div className="mt-12 mb-20">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My Writings</p>
        <h2 className={`${styles.sectionHeadTextLight}`}>Blog.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
          Sharing insights, tutorials, and thoughts on web development,
          programming, and technology. Stay updated with the latest trends and
          best practices in software engineering.
        </motion.p>
      </div>

      {/* Blog Grid */}
      <div className="mt-20 flex flex-wrap gap-8 justify-center">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} {...post} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        variants={fadeIn('up', 'spring', 0.5, 0.75)}
        className="flex justify-center mt-12">
        <button
          className="bg-primary hover:bg-primary/80 text-night font-beckman font-bold 
          px-8 py-4 rounded-[10px] text-[16px] uppercase tracking-wider
          transition-all duration-300 hover:scale-105 shadow-lg"
          onClick={() => console.log('View all blogs')}>
          View All Posts
        </button>
      </motion.div>
    </div>
  );
};

const WrappedBlog = SectionWrapper(Blog, 'blog');
export default WrappedBlog;
