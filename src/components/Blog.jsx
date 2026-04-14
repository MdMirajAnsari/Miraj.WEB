import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';

const BlogCard = ({ id, title, excerpt, date, category, readTime, image, index }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative" onClick={() => navigate(`/blog/${id}`)}>
      {/* Category Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase">
          {category}
        </span>
      </div>

      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-gray-500 text-sm">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{title}</h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          <span>Read More</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
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
    </div>
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
      category: 'tech',
      readTime: 45,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
    },
    {
      id: 2,
      title: 'Building Scalable Web Applications with React',
      excerpt:
        'Explore best practices for creating maintainable and scalable React applications using modern patterns and tools.',
      date: 'Jan 15, 2024',
      category: 'coding',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    },
    {
      id: 3,
      title: 'The Future of JavaScript: What\'s Coming in ES2024',
      excerpt:
        'A deep dive into the latest JavaScript features and how they will change the way we write code.',
      date: 'Jan 10, 2024',
      category: 'tech',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    },
    {
      id: 4,
      title: 'Mastering TypeScript for Better Code Quality',
      excerpt:
        'Learn how TypeScript can help you write more robust code and catch bugs before they reach production.',
      date: 'Jan 5, 2024',
      category: 'coding',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    },
    {
      id: 5,
      title: 'How to write code for .net projects',
      excerpt:
        'A comprehensive guide to writing clean, efficient, and maintainable code for .NET projects, covering best practices and design patterns.',
      date: 'Jan 1, 2024',
      category: 'projects',
      readTime: 12,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
      
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'tech', 'interview', 'fun', 'coding', 'projects'];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Blog
        </h2>
        <p className={`${styles.sectionSubText} text-center`}>
          Sharing insights, tutorials, and thoughts on web development
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.id} {...post} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
