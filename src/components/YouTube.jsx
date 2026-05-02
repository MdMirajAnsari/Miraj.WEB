import { useState } from 'react';
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
    },
    {
      id: 5,
      embedId: 'Rgx8dpiPwpA',
      title: 'Video 5',
      url: 'https://www.youtube.com/watch?v=Rgx8dpiPwpA',
      category: 'fun'
    },
    {
      id: 6,
      embedId: '5bId3N7QZec',
      title: 'Video 6',
      url: 'https://www.youtube.com/watch?v=5bId3N7QZec',
      category: 'fun'
    },
    {
      id: 7,
      embedId: 'ebniIyejb1E',
      title: 'Video 7',
      url: 'https://www.youtube.com/watch?v=ebniIyejb1E&t=18s',
      category: 'angular interview'
    },
    {
      id: 8,
      embedId: 'uUnx3M1_uAg',
      title: 'Video 8',
      url: 'https://www.youtube.com/watch?v=uUnx3M1_uAg',
      category: 'angular interview'
    },
    {
      id: 9,
      embedId: '_gfmaVcMFLk',
      title: 'Video 9',
      url: 'https://www.youtube.com/watch?v=_gfmaVcMFLk',
      category: 'angular interview'
    },
    {
      id: 10,
      embedId: 'w2Mvky1rio8',
      title: 'Video 10',
      url: 'https://www.youtube.com/watch?v=w2Mvky1rio8',
      category: 'angular interview'
    },
    {
      id: 11,
      embedId: 'SYHCP23PRGk',
      title: 'Video 11',
      url: 'https://www.youtube.com/watch?v=SYHCP23PRGk',
      category: 'angular interview'
    },
    {
      id: 12,
      embedId: 'JR548Nt7r7I',
      title: 'Video 12',
      url: 'https://www.youtube.com/watch?v=JR548Nt7r7I',
      category: 'angular interview'
    },
    {
      id: 13,
      embedId: 'GuIsHRpp4y4',
      title: 'Video 13',
      url: 'https://www.youtube.com/watch?v=GuIsHRpp4y4',
      category: 'angular interview'
    },
    {
      id: 14,
      embedId: '8ToYU5SS0z8',
      title: 'Video 14',
      url: 'https://www.youtube.com/watch?v=8ToYU5SS0z8',
      category: 'angular interview'
    },
    {
      id: 15,
      embedId: 'qHRvtww2V3U',
      title: 'Video 15',
      url: 'https://www.youtube.com/watch?v=qHRvtww2V3U',
      category: 'angular interview'
    },
    {
      id: 16,
      embedId: 'kVA17khNYvw',
      title: 'Video 16',
      url: 'https://www.youtube.com/watch?v=kVA17khNYvw',
      category: 'angular interview'
    },
    {
      id: 17,
      embedId: 'i5gRxiQFupU',
      title: 'Video 17',
      url: 'https://www.youtube.com/watch?v=i5gRxiQFupU',
      category: 'angular interview'
    },
    {
      id: 18,
      embedId: 'fcZCNSaNTFo',
      title: 'Video 18',
      url: 'https://www.youtube.com/watch?v=fcZCNSaNTFo',
      category: 'angular interview'
    },
    {
      id: 19,
      embedId: 'NBe9qgUKGyA',
      title: 'Video 19',
      url: 'https://www.youtube.com/watch?v=NBe9qgUKGyA',
      category: 'angular interview'
    },
    {
      id: 20,
      embedId: 'uo-ysRYnlqU',
      title: 'Video 20',
      url: 'https://www.youtube.com/watch?v=uo-ysRYnlqU',
      category: 'angular interview'
    },
    {
      id: 21,
      embedId: '9hWvhAiDKqQ',
      title: 'Video 21',
      url: 'https://www.youtube.com/watch?v=9hWvhAiDKqQ',
      category: 'angular interview'
    },
    {
      id: 22,
      embedId: 'Z0A7FjGXna8',
      title: 'Video 22',
      url: 'https://www.youtube.com/watch?v=Z0A7FjGXna8',
      category: 'angular interview'
    },
    {
      id: 23,
      embedId: '9mE02hYx4Sk',
      title: 'Video 23',
      url: 'https://www.youtube.com/watch?v=9mE02hYx4Sk',
      category: 'angular interview'
    },
    {
      id: 24,
      embedId: '-0exw-9YJBo',
      title: 'Video 24',
      url: 'https://www.youtube.com/watch?v=-0exw-9YJBo&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm',
      category: 'mern project'
    },
    {
      id: 25,
      embedId: 'enopDSs3DRw',
      title: 'Video 25',
      url: 'https://www.youtube.com/watch?v=enopDSs3DRw&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=2',
      category: 'mern project'
    },
    {
      id: 26,
      embedId: 'mvfsC66xqj0',
      title: 'Video 26',
      url: 'https://www.youtube.com/watch?v=mvfsC66xqj0&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=3',
      category: 'mern project'
    },
    {
      id: 27,
      embedId: 'UXjMo25Nnvc',
      title: 'Video 27',
      url: 'https://www.youtube.com/watch?v=UXjMo25Nnvc&list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm&index=4&pbjreload=102',
      category: 'mern project'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'tech', 'interview', 'angular interview', 'mern project', 'fun', 'coding', 'projects'];

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
                ? 'glass-button-active text-white'
                : 'glass-button text-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {filteredVideos.map((video) => (
          <div key={video.id} className="glass-card rounded-lg overflow-hidden relative transition-all duration-300 hover:-translate-y-1">
            {/* Category Badge */}
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 bg-blue-500/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase">
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
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{video.title}</h3>
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
