import React, { useState } from 'react';
import { styles } from '../styles';

const Gallery = () => {
  const [images] = useState([
    {
      id: 1,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20231227_070256752_ljlbp8.jpg',
      name: 'Scene 1',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20231227_070256752_ljlbp8.jpg',
      category: 'scene'
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20210227_162542_mjbd7m.jpg',
      name: 'Scene 2',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20210227_162542_mjbd7m.jpg',
      category: 'scene'
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654836/GalaryScene/IMG20250222134645_jsdseg.jpg',
      name: 'Scene 3',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654836/GalaryScene/IMG20250222134645_jsdseg.jpg',
      category: 'scene'
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654834/GalaryScene/IMG20250529145657_cbitot.jpg',
      name: 'Scene 4',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654834/GalaryScene/IMG20250529145657_cbitot.jpg',
      category: 'scene'
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG-20250729-WA0012_icvb6q.jpg',
      name: 'Scene 5',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG-20250729-WA0012_icvb6q.jpg',
      category: 'scene'
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
      name: 'Scene 6',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
      category: 'scene'
    },
    {
      id: 7,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
      name: 'Scene 7',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
      category: 'scene'
    },
    {
      id: 8,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
      name: 'Scene 8',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
      category: 'scene'
    },
    {
      id: 9,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
      name: 'Scene 9',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
      category: 'scene'
    },
    {
      id: 10,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG-20250404-WA0071_rjshoi.jpg',
      name: 'Scene 10',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG-20250404-WA0071_rjshoi.jpg',
      category: 'scene'
    },
    {
      id: 11,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20230914_161324766_sevkyy.jpg',
      name: 'Scene 11',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20230914_161324766_sevkyy.jpg',
      category: 'scene'
    },
    {
      id: 12,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/c6681a26-9796-45fa-9eef-20af3484ead9_htudjj.jpg',
      name: 'Scene 12',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/c6681a26-9796-45fa-9eef-20af3484ead9_htudjj.jpg',
      category: 'scene'
    },
    {
      id: 13,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_20240107_164842869_fbdmz4.jpg',
      name: 'Scene 13',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_20240107_164842869_fbdmz4.jpg',
      category: 'scene'
    },
    {
      id: 14,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_7385_skxk7e.jpg',
      name: 'Scene 14',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_7385_skxk7e.jpg',
      category: 'scene'
    },
    {
      id: 15,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/24059141-8640-4bee-a3a6-3f46979e612b_mdro7q.jpg',
      name: 'Scene 15',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/24059141-8640-4bee-a3a6-3f46979e612b_mdro7q.jpg',
      category: 'scene'
    },
    {
      id: 16,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654829/GalaryScene/IMG-20250404-WA0025_gyilhd.jpg',
      name: 'Scene 16',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654829/GalaryScene/IMG-20250404-WA0025_gyilhd.jpg',
      category: 'scene'
    },
    {
      id: 17,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654827/GalaryScene/IMG_7230_nciin5.jpg',
      name: 'Scene 17',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654827/GalaryScene/IMG_7230_nciin5.jpg',
      category: 'scene'
    },
    {
      id: 18,
      url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654789/GalaryScene/IMG20250404131640_qiopxi.jpg',
      name: 'Scene 18',
      originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654789/GalaryScene/IMG20250404131640_qiopxi.jpg',
      category: 'scene'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', 'scene'];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory);
  const totalImages = images.length;
  const visibleImages = filteredImages.length;

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center text-white`}>
          Gallery
        </h2>
        <p className={`${styles.sectionSubText} text-center text-gray-300`}>
          Featured Photos Collection
        </p>
        <p className="mt-3 text-sm sm:text-base text-blue-300 font-poppins">
          {selectedCategory === 'all'
            ? `${totalImages} photos`
            : `${visibleImages} of ${totalImages} photos`}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredImages.map((image) => (
          <div key={image.id} className="relative group">
            {/* Category Badge */}
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 bg-blue-500/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase">
                {image.category}
              </span>
            </div>
            <a
              href={image.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                }}
              />
            </a>
            <div className="glass-card mt-2 sm:mt-3 rounded-lg px-3 py-2">
              <p className="text-sm font-medium text-white truncate">{image.name}</p>
              <a
                href={image.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                View photo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
