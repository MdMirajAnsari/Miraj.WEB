import React, { useState } from 'react';
import { styles } from '../styles';

const YouTube = () => {
  const [videos] = useState([
    {
      id: 1,
      embedId: 'lFeYU31TnQ8',
      title: 'Video 1',
      url: 'https://www.youtube.com/watch?v=lFeYU31TnQ8'
    },
    {
      id: 2,
      embedId: 'F2FmTdLtb_4',
      title: 'Video 2',
      url: 'https://www.youtube.com/watch?v=F2FmTdLtb_4'
    },
    {
      id: 3,
      embedId: 'CuQmQpvw04I',
      title: 'Video 3',
      url: 'https://www.youtube.com/watch?v=CuQmQpvw04I'
    },
    {
      id: 4,
      embedId: 'X48VuDVv0do',
      title: 'Video 4',
      url: 'https://www.youtube.com/watch?v=X48VuDVv0do'
    }
  ]);

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center`}>
          YouTube Videos
        </h2>
        <p className={`${styles.sectionSubText} text-center`}>
          Watch my favorite videos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
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