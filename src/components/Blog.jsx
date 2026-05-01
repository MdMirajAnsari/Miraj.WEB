import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';
import { blogPosts } from '../constants/blogData';

const BlogCard = ({ id, title, excerpt, date, category, readTime, image }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer relative border border-gray-800" onClick={() => navigate(`/blog/${id}`)}>
      {/* Category Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase">
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
        <div className="flex items-center gap-3 mb-3 text-gray-400 text-sm">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">{title}</h3>

        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
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

const Blog = () => {
  const posts = Object.values(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...new Set(posts.map((post) => post.category))];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter((post) => post.category === selectedCategory);
  const totalPosts = posts.length;
  const visiblePosts = filteredPosts.length;

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 bg-primary min-h-screen pt-[80px] pb-10`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center text-white`}>
          Blog
        </h2>
        <p className={`${styles.sectionSubText} text-center text-gray-400`}>
          Sharing insights, tutorials, and thoughts on web development
        </p>
        <p className="mt-3 text-sm sm:text-base text-indigo-300 font-poppins">
          {selectedCategory === 'all'
            ? `${totalPosts} blogs`
            : `${visiblePosts} of ${totalPosts} blogs`}
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
