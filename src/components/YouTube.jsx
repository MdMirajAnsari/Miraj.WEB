import React, { useState } from 'react';
import { styles } from '../styles';

const YouTube = () => {
  const [videos] = useState([
    {
      id: 1,
      embedId: 'lFeYU31TnQ8',
      title: 'Video 1',
      url: 'https://www.youtube.com/watch?v=lFeYU31TnQ8',
      category: 'tech'
    },
    {
      id: 2,
      embedId: 'F2FmTdLtb_4',
      title: 'Video 2',
      url: 'https://www.youtube.com/watch?v=F2FmTdLtb_4',
      category: 'interview'
    },
    {
      id: 3,
      embedId: 'CuQmQpvw04I',
      title: 'Video 3',
      url: 'https://www.youtube.com/watch?v=CuQmQpvw04I',
      category: 'fun'
    },
    {
      id: 4,
      embedId: 'X48VuDVv0do',
      title: 'Video 4',
      url: 'https://www.youtube.com/watch?v=X48VuDVv0do',
      category: 'coding'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'tech', 'interview', 'fun', 'coding', 'projects'];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);
  const totalVideos = videos.length;
  const visibleVideos = filteredVideos.length;

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center text-white`}>
          YouTube Videos
        </h2>
        <p className={`${styles.sectionSubText} text-center text-gray-300`}>
          Watch my favorite videos
        </p>
        <p className="mt-3 text-sm sm:text-base text-blue-600 font-poppins">
          {selectedCategory === 'all'
            ? `${totalVideos} videos`
            : `${visibleVideos} of ${totalVideos} videos`}
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
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            {/* Category Badge */}
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase">
                {video.category}
              </span>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.embedId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTube;
