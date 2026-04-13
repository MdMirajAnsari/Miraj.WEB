import React, { useState } from 'react';
import { styles } from '../styles';

const Gallery = () => {
  const [images] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=300&fit=crop',
      name: 'Butterfly on Leaf',
      originalUrl: 'https://unsplash.com/photos/a-butterfly-on-a-leaf-Kl3MvqEPJmY'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
      name: 'City Lights Bokeh',
      originalUrl: 'https://unsplash.com/photos/bokeh-photography-of-city-lights-during-night-time-ixcjK6eLaIs'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
      name: 'Golden Buddha Statue',
      originalUrl: 'https://unsplash.com/photos/a-large-golden-buddha-statue-sits-atop-a-colorful-pedestal--YbWw5mpgms'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      name: 'Red Wall Architecture',
      originalUrl: 'https://unsplash.com/photos/red-wall-with-blue-ceiling-and-red-pillar-S6aUx1L_qrA'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      name: 'Yellow Vintage Car',
      originalUrl: 'https://unsplash.com/photos/a-yellow-vintage-car-parked-by-a-body-of-water-J9arQNc4xTU'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1551782450-17144efb5723?w=400&h=300&fit=crop',
      name: 'White Eggs',
      originalUrl: 'https://unsplash.com/photos/two-white-eggs-one-cracked-on-black-background-aBHhCAB_xqc'
    }
  ]);

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Gallery
        </h2>
        <p className={`${styles.sectionSubText} text-center`}>
          Featured Photos Collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <a
              href={image.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                }}
              />
            </a>
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-800 truncate">{image.name}</p>
              <a
                href={image.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                View on Unsplash
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;