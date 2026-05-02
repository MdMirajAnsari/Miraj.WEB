import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styles } from '../styles';
import { blogPosts } from '../constants/blogData';

const favoriteStorageKey = 'miraj-blog-favorites';
const recentStorageKey = 'miraj-blog-recently-viewed';
const pinnedCategories = ['C# / .NET', 'Angular', 'SQL', 'System Design', 'Architecture'];

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

const decoratePost = (post) => ({
  ...post,
  tags: getPostTags(post),
  isPinned: pinnedCategories.includes(post.category),
});

const formatCategory = (category) =>
  category.charAt(0).toUpperCase() + category.slice(1);

const parseDate = (date) => new Date(date).getTime() || 0;

const BlogCard = ({ post, isFavorite, onToggleFavorite }) => {
  const navigate = useNavigate();

  const openPost = () => navigate(`/blog/${post.id}`);

  return (
    <article className="glass-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative hover:-translate-y-1">
      <button
        type="button"
        onClick={openPost}
        className="block w-full text-left"
        aria-label={`Read ${post.title}`}
      >
        <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-2 pr-12">
          <span className="px-2 py-1 bg-indigo-500/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase">
            {post.category}
          </span>
          {post.isPinned && (
            <span className="px-2 py-1 bg-amber-500/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase">
              Pinned
            </span>
          )}
        </div>

        <div className="h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(event) => {
              event.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
            }}
          />
        </div>
      </button>

      <button
        type="button"
        onClick={onToggleFavorite}
        className={`absolute top-2 right-2 z-20 h-9 w-9 rounded-full border border-white/20 text-sm font-bold ${
          isFavorite ? 'glass-button-active text-white' : 'glass-button text-gray-200'
        }`}
        aria-label={isFavorite ? `Remove ${post.title} from favorites` : `Add ${post.title} to favorites`}
      >
        {isFavorite ? 'S' : '+'}
      </button>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-3 text-gray-400 text-sm">
          <span>{post.date}</span>
          <span>|</span>
          <span>{post.readTime} min read</span>
        </div>

        <button type="button" onClick={openPost} className="block text-left">
          <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">{post.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
        </button>

        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-full bg-white/10 text-gray-200 text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={openPost}
            className="text-indigo-300 hover:text-indigo-100 text-sm font-medium transition-colors"
          >
            Read More &rarr;
          </button>
          <button
            type="button"
            onClick={onToggleFavorite}
            className="text-gray-300 hover:text-white text-sm transition-colors"
          >
            {isFavorite ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
    </article>
  );
};

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    readTime: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    isPinned: PropTypes.bool.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

const Blog = () => {
  const posts = useMemo(() => Object.values(blogPosts).map(decoratePost), []);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState('latest');
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredArray(favoriteStorageKey));
  const [recentIds] = useState(() => readStoredArray(recentStorageKey));

  const categoryCounts = useMemo(
    () =>
      posts.reduce(
        (counts, post) => ({
          ...counts,
          [post.category]: (counts[post.category] || 0) + 1,
        }),
        { all: posts.length },
      ),
    [posts],
  );

  const categories = useMemo(() => ['all', ...new Set(posts.map((post) => post.category))], [posts]);

  const featuredPost = useMemo(
    () => [...posts].sort((firstPost, secondPost) => parseDate(secondPost.date) - parseDate(firstPost.date))[0] || posts[0],
    [posts],
  );

  const pinnedPosts = useMemo(() => posts.filter((post) => post.isPinned).slice(0, 4), [posts]);
  const recentlyViewedPosts = useMemo(
    () => recentIds.map((id) => posts.find((post) => post.id === id)).filter(Boolean).slice(0, 5),
    [posts, recentIds],
  );

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchedPosts = posts.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        [post.title, post.category, post.excerpt, post.content, post.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });

    return [...matchedPosts].sort((firstPost, secondPost) => {
      if (sortMode === 'oldest') {
        return parseDate(firstPost.date) - parseDate(secondPost.date);
      }

      if (sortMode === 'title') {
        return firstPost.title.localeCompare(secondPost.title);
      }

      if (sortMode === 'category') {
        return firstPost.category.localeCompare(secondPost.category) || firstPost.title.localeCompare(secondPost.title);
      }

      if (sortMode === 'readTime') {
        return firstPost.readTime - secondPost.readTime;
      }

      return parseDate(secondPost.date) - parseDate(firstPost.date);
    });
  }, [posts, searchTerm, selectedCategory, sortMode]);

  const toggleFavorite = (id) => {
    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [id, ...currentIds];

      writeStoredArray(favoriteStorageKey, nextIds);
      return nextIds;
    });
  };

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 min-h-screen pt-[80px] pb-10`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center text-white`}>
          Blog
        </h2>
        <p className={`${styles.sectionSubText} text-center text-gray-400`}>
          Sharing insights, tutorials, and thoughts on web development
        </p>
        <p className="mt-3 text-sm sm:text-base text-indigo-300 font-poppins">
          {filteredPosts.length} of {posts.length} blogs | {favoriteIds.length} bookmarked
        </p>
      </div>

      {featuredPost && (
        <section className="glass-card rounded-lg overflow-hidden mb-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
          <button type="button" onClick={() => navigate(`/blog/${featuredPost.id}`)} className="block h-64 lg:h-auto">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
          </button>
          <div className="p-6 sm:p-8">
            <span className="inline-flex px-3 py-1 rounded-full bg-indigo-500/70 text-white text-xs font-bold uppercase">
              Featured
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-beckman font-bold text-white">{featuredPost.title}</h3>
            <p className="mt-4 text-gray-300 leading-7">{featuredPost.excerpt}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {featuredPost.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full bg-white/10 text-gray-200 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate(`/blog/${featuredPost.id}`)}
              className="mt-6 glass-button-active text-white px-5 py-3 rounded-lg font-poppins transition"
            >
              Read Featured Post
            </button>
          </div>
        </section>
      )}

      <div className="glass-card rounded-lg p-4 sm:p-5 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search title, category, excerpt, tags, or content"
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-indigo-300"
          />
          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-indigo-300"
          >
            <option className="text-black" value="latest">Latest</option>
            <option className="text-black" value="oldest">Oldest</option>
            <option className="text-black" value="title">Title</option>
            <option className="text-black" value="category">Category</option>
            <option className="text-black" value="readTime">Read time</option>
          </select>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'glass-button-active text-white'
                  : 'glass-button text-gray-300'
              }`}
            >
              {formatCategory(category)} ({categoryCounts[category] || 0})
            </button>
          ))}
        </div>
      </div>

      {(pinnedPosts.length > 0 || recentlyViewedPosts.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {pinnedPosts.length > 0 && (
            <section className="glass-card rounded-lg p-5">
              <h3 className="text-white text-xl font-semibold mb-4">Pinned Posts</h3>
              <div className="space-y-3">
                {pinnedPosts.map((post) => (
                  <button key={post.id} type="button" onClick={() => navigate(`/blog/${post.id}`)} className="block w-full text-left text-gray-300 hover:text-white">
                    {post.title}
                  </button>
                ))}
              </div>
            </section>
          )}

          {recentlyViewedPosts.length > 0 && (
            <section className="glass-card rounded-lg p-5">
              <h3 className="text-white text-xl font-semibold mb-4">Recently Viewed</h3>
              <div className="space-y-3">
                {recentlyViewedPosts.map((post) => (
                  <button key={post.id} type="button" onClick={() => navigate(`/blog/${post.id}`)} className="block w-full text-left text-gray-300 hover:text-white">
                    {post.title}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="glass-card rounded-lg p-8 text-center text-gray-300">
          No posts match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              isFavorite={favoriteIds.includes(post.id)}
              onToggleFavorite={() => toggleFavorite(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
