import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { styles } from '../styles';

const favoriteStorageKey = 'miraj-gallery-favorites';
const recentStorageKey = 'miraj-gallery-recently-viewed';

const galleryImages = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20231227_070256752_ljlbp8.jpg',
    name: 'Morning Landscape',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20231227_070256752_ljlbp8.jpg',
    category: 'scene',
    album: 'Trips',
    location: 'Outdoor',
    date: '2023-12-27',
    tags: ['nature', 'morning', 'travel'],
    description: 'A calm outdoor scene captured during a morning trip.',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20210227_162542_mjbd7m.jpg',
    name: 'Golden Afternoon',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654842/GalaryScene/IMG_20210227_162542_mjbd7m.jpg',
    category: 'scene',
    album: 'Memories',
    location: 'Outdoor',
    date: '2021-02-27',
    tags: ['memory', 'scene', 'sunlight'],
    description: 'An older favorite from the gallery collection.',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654836/GalaryScene/IMG20250222134645_jsdseg.jpg',
    name: 'February View',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654836/GalaryScene/IMG20250222134645_jsdseg.jpg',
    category: 'scene',
    album: 'Trips',
    location: 'Travel',
    date: '2025-02-22',
    tags: ['travel', 'daylight', 'scene'],
    description: 'A travel scene from February.',
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654834/GalaryScene/IMG20250529145657_cbitot.jpg',
    name: 'May Scene',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654834/GalaryScene/IMG20250529145657_cbitot.jpg',
    category: 'scene',
    album: 'Trips',
    location: 'Travel',
    date: '2025-05-29',
    tags: ['travel', 'outdoor', 'may'],
    description: 'A bright scene from the May collection.',
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG-20250729-WA0012_icvb6q.jpg',
    name: 'Shared Moment',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG-20250729-WA0012_icvb6q.jpg',
    category: 'scene',
    album: 'Memories',
    location: 'Shared',
    date: '2025-07-29',
    tags: ['memory', 'shared', 'scene'],
    description: 'A saved image from a shared memory.',
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
    name: 'March Afternoon',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
    category: 'scene',
    album: 'Workspace',
    location: 'Outdoor',
    date: '2024-03-07',
    tags: ['afternoon', 'outdoor', 'scene'],
    description: 'An outdoor afternoon capture.',
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
    name: 'October Scene',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
    category: 'scene',
    album: 'Memories',
    location: 'Outdoor',
    date: '2023-10-09',
    tags: ['october', 'memory', 'scene'],
    description: 'A scene captured in October.',
  },
  {
    id: 8,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
    name: 'March Detail',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654832/GalaryScene/IMG_20240307_143932632_brb2gx.jpg',
    category: 'scene',
    album: 'Design',
    location: 'Outdoor',
    date: '2024-03-07',
    tags: ['detail', 'composition', 'scene'],
    description: 'A repeat view used as a composition detail.',
  },
  {
    id: 9,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
    name: 'October Detail',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20231009_110354449_aq39c0.jpg',
    category: 'scene',
    album: 'Design',
    location: 'Outdoor',
    date: '2023-10-09',
    tags: ['detail', 'composition', 'memory'],
    description: 'A second October view for comparison.',
  },
  {
    id: 10,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG-20250404-WA0071_rjshoi.jpg',
    name: 'April Memory',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG-20250404-WA0071_rjshoi.jpg',
    category: 'scene',
    album: 'Memories',
    location: 'Shared',
    date: '2025-04-04',
    tags: ['april', 'shared', 'memory'],
    description: 'A saved memory from April.',
  },
  {
    id: 11,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20230914_161324766_sevkyy.jpg',
    name: 'September Light',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/IMG_20230914_161324766_sevkyy.jpg',
    category: 'scene',
    album: 'Trips',
    location: 'Outdoor',
    date: '2023-09-14',
    tags: ['september', 'light', 'travel'],
    description: 'A light-rich scene from September.',
  },
  {
    id: 12,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/c6681a26-9796-45fa-9eef-20af3484ead9_htudjj.jpg',
    name: 'Saved Frame',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654831/GalaryScene/c6681a26-9796-45fa-9eef-20af3484ead9_htudjj.jpg',
    category: 'scene',
    album: 'Design',
    location: 'Collection',
    date: '2024-01-01',
    tags: ['frame', 'design', 'collection'],
    description: 'A saved frame from the gallery archive.',
  },
  {
    id: 13,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_20240107_164842869_fbdmz4.jpg',
    name: 'January Evening',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_20240107_164842869_fbdmz4.jpg',
    category: 'scene',
    album: 'Trips',
    location: 'Outdoor',
    date: '2024-01-07',
    tags: ['january', 'evening', 'travel'],
    description: 'An evening scene from early January.',
  },
  {
    id: 14,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_7385_skxk7e.jpg',
    name: 'Camera Roll Scene',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/IMG_7385_skxk7e.jpg',
    category: 'scene',
    album: 'Memories',
    location: 'Camera Roll',
    date: '2024-02-01',
    tags: ['camera', 'memory', 'scene'],
    description: 'A selected photo from the camera roll.',
  },
  {
    id: 15,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/24059141-8640-4bee-a3a6-3f46979e612b_mdro7q.jpg',
    name: 'Archive Scene',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654830/GalaryScene/24059141-8640-4bee-a3a6-3f46979e612b_mdro7q.jpg',
    category: 'scene',
    album: 'Design',
    location: 'Collection',
    date: '2024-02-15',
    tags: ['archive', 'collection', 'design'],
    description: 'A photo preserved from the archive.',
  },
  {
    id: 16,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654829/GalaryScene/IMG-20250404-WA0025_gyilhd.jpg',
    name: 'April Outdoor',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654829/GalaryScene/IMG-20250404-WA0025_gyilhd.jpg',
    category: 'scene',
    album: 'Trips',
    location: 'Outdoor',
    date: '2025-04-04',
    tags: ['april', 'outdoor', 'travel'],
    description: 'An outdoor photo from April.',
  },
  {
    id: 17,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654827/GalaryScene/IMG_7230_nciin5.jpg',
    name: 'Gallery Highlight',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654827/GalaryScene/IMG_7230_nciin5.jpg',
    category: 'scene',
    album: 'Memories',
    location: 'Camera Roll',
    date: '2024-03-15',
    tags: ['highlight', 'memory', 'scene'],
    description: 'A highlighted image from the gallery.',
  },
  {
    id: 18,
    url: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654789/GalaryScene/IMG20250404131640_qiopxi.jpg',
    name: 'April Daylight',
    originalUrl: 'https://res.cloudinary.com/dj6ebo4as/image/upload/v1777654789/GalaryScene/IMG20250404131640_qiopxi.jpg',
    category: 'scene',
    album: 'Trips',
    location: 'Travel',
    date: '2025-04-04',
    tags: ['april', 'daylight', 'travel'],
    description: 'A daylight scene from April.',
  },
];

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

const formatLabel = (value) =>
  value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const parseDate = (date) => new Date(date).getTime() || 0;

const GalleryImage = ({ image, isFavorite, onOpen, onToggleFavorite }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article className="glass-card mb-5 break-inside-avoid overflow-hidden rounded-lg relative group">
      <button type="button" onClick={onOpen} className="block w-full text-left" aria-label={`Open ${image.name}`}>
        <div className="relative bg-white/10">
          {!isLoaded && <div className="absolute inset-0 animate-pulse bg-white/10" />}
          <img
            src={image.url}
            alt={image.name}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={(event) => {
              event.currentTarget.src = 'https://via.placeholder.com/600x800?text=Image+Not+Available';
              setIsLoaded(true);
            }}
            className={`w-full object-cover transition-all duration-300 group-hover:scale-[1.02] ${
              image.id % 3 === 0 ? 'h-80' : image.id % 2 === 0 ? 'h-56' : 'h-64'
            } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <span className="absolute left-2 top-2 px-2 py-1 bg-blue-500/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase">
            {image.category}
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={onToggleFavorite}
        className={`absolute right-2 top-2 z-10 h-9 w-9 rounded-full border border-white/20 text-sm font-bold ${
          isFavorite ? 'glass-button-active text-white' : 'glass-button text-gray-200'
        }`}
        aria-label={isFavorite ? `Remove ${image.name} from favorites` : `Add ${image.name} to favorites`}
      >
        {isFavorite ? 'S' : '+'}
      </button>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white">{image.name}</h3>
            <p className="mt-1 text-xs text-gray-400">{image.location} | {image.date}</p>
          </div>
          <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-200">{image.album}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {image.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

GalleryImage.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState('newest');
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredArray(favoriteStorageKey));
  const [recentIds, setRecentIds] = useState(() => readStoredArray(recentStorageKey));
  const [activeImageId, setActiveImageId] = useState(null);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);

  const categoryCounts = useMemo(
    () =>
      galleryImages.reduce(
        (counts, image) => ({
          ...counts,
          [image.category]: (counts[image.category] || 0) + 1,
        }),
        { all: galleryImages.length },
      ),
    [],
  );

  const albumCounts = useMemo(
    () =>
      galleryImages.reduce(
        (counts, image) => ({
          ...counts,
          [image.album]: (counts[image.album] || 0) + 1,
        }),
        { all: galleryImages.length },
      ),
    [],
  );

  const categories = useMemo(() => ['all', ...new Set(galleryImages.map((image) => image.category))], []);
  const albums = useMemo(() => ['all', ...new Set(galleryImages.map((image) => image.album))], []);

  const filteredImages = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchedImages = galleryImages.filter((image) => {
      const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
      const matchesAlbum = selectedAlbum === 'all' || image.album === selectedAlbum;
      const matchesSearch =
        !normalizedSearch ||
        [image.name, image.category, image.album, image.location, image.date, image.tags.join(' '), image.description]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesAlbum && matchesSearch;
    });

    return [...matchedImages].sort((firstImage, secondImage) => {
      if (sortMode === 'oldest') {
        return parseDate(firstImage.date) - parseDate(secondImage.date);
      }

      if (sortMode === 'title') {
        return firstImage.name.localeCompare(secondImage.name);
      }

      if (sortMode === 'category') {
        return firstImage.category.localeCompare(secondImage.category) || firstImage.name.localeCompare(secondImage.name);
      }

      if (sortMode === 'favorites') {
        return Number(favoriteIds.includes(secondImage.id)) - Number(favoriteIds.includes(firstImage.id)) || firstImage.id - secondImage.id;
      }

      return parseDate(secondImage.date) - parseDate(firstImage.date);
    });
  }, [favoriteIds, searchTerm, selectedAlbum, selectedCategory, sortMode]);

  const activeIndex = activeImageId === null
    ? -1
    : filteredImages.findIndex((image) => image.id === activeImageId);
  const activeImage = activeIndex >= 0 ? filteredImages[activeIndex] : null;
  const recentlyViewedImages = recentIds.map((id) => galleryImages.find((image) => image.id === id)).filter(Boolean).slice(0, 5);

  const toggleFavorite = (id) => {
    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [id, ...currentIds];

      writeStoredArray(favoriteStorageKey, nextIds);
      return nextIds;
    });
  };

  const rememberImage = useCallback((id) => {
    setRecentIds((currentIds) => {
      const nextIds = [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 8);
      writeStoredArray(recentStorageKey, nextIds);
      return nextIds;
    });
  }, []);

  const openLightbox = (id) => {
    setActiveImageId(id);
    rememberImage(id);
  };

  const closeLightbox = useCallback(() => {
    setActiveImageId(null);
    setIsSlideshowRunning(false);
  }, []);

  const showImageAtOffset = useCallback((offset) => {
    if (filteredImages.length === 0 || activeIndex < 0) {
      return;
    }

    const nextIndex = (activeIndex + offset + filteredImages.length) % filteredImages.length;
    const nextImage = filteredImages[nextIndex];
    setActiveImageId(nextImage.id);
    rememberImage(nextImage.id);
  }, [activeIndex, filteredImages, rememberImage]);

  const openRandomImage = () => {
    if (filteredImages.length === 0) {
      return;
    }

    const randomImage = filteredImages[Math.floor(Math.random() * filteredImages.length)];
    openLightbox(randomImage.id);
  };

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }

      if (event.key === 'ArrowRight') {
        showImageAtOffset(1);
      }

      if (event.key === 'ArrowLeft') {
        showImageAtOffset(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, closeLightbox, showImageAtOffset]);

  useEffect(() => {
    if (!isSlideshowRunning || !activeImage) {
      return undefined;
    }

    const slideshowTimer = window.setInterval(() => showImageAtOffset(1), 3000);
    return () => window.clearInterval(slideshowTimer);
  }, [activeImage, isSlideshowRunning, showImageAtOffset]);

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 min-h-screen pt-[120px] pb-10`}>
      <div className="text-center mb-8">
        <h2 className={`${styles.sectionHeadText} text-center text-white`}>
          Gallery
        </h2>
        <p className={`${styles.sectionSubText} text-center text-gray-300`}>
          Featured Photos Collection
        </p>
        <p className="mt-3 text-sm sm:text-base text-blue-300 font-poppins">
          {filteredImages.length} of {galleryImages.length} photos | {favoriteIds.length} saved
        </p>
      </div>

      <div className="glass-card rounded-lg p-4 sm:p-5 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_180px] gap-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search title, category, location, tag, or date"
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
          />
          <select
            value={selectedAlbum}
            onChange={(event) => setSelectedAlbum(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-blue-300"
          >
            {albums.map((album) => (
              <option key={album} className="text-black" value={album}>
                {formatLabel(album)} ({albumCounts[album] || 0})
              </option>
            ))}
          </select>
          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-blue-300"
          >
            <option className="text-black" value="newest">Newest</option>
            <option className="text-black" value="oldest">Oldest</option>
            <option className="text-black" value="title">Title</option>
            <option className="text-black" value="category">Category</option>
            <option className="text-black" value="favorites">Favorites</option>
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
              {formatLabel(category)} ({categoryCounts[category] || 0})
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={openRandomImage} className="glass-button-active px-4 py-2 rounded-full text-sm text-white">
            Random Image
          </button>
          {recentlyViewedImages.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-300">
              <span>Recently viewed:</span>
              {recentlyViewedImages.map((image) => (
                <button key={image.id} type="button" onClick={() => openLightbox(image.id)} className="text-blue-300 hover:text-blue-100">
                  {image.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="glass-card rounded-lg p-8 text-center text-gray-300">
          No images match your filters.
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
          {filteredImages.map((image) => (
            <GalleryImage
              key={image.id}
              image={image}
              isFavorite={favoriteIds.includes(image.id)}
              onOpen={() => openLightbox(image.id)}
              onToggleFavorite={() => toggleFavorite(image.id)}
            />
          ))}
        </div>
      )}

      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md">
          <div className="h-full grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="relative flex items-center justify-center min-h-0 p-4 sm:p-8">
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-20 glass-button px-4 py-2 rounded-full text-white"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => showImageAtOffset(-1)}
                className="absolute left-4 top-1/2 z-20 glass-button h-11 w-11 -translate-y-1/2 rounded-full text-white"
                aria-label="Previous image"
              >
                &lt;
              </button>
              <img
                src={activeImage.originalUrl}
                alt={activeImage.name}
                className="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={() => showImageAtOffset(1)}
                className="absolute right-4 top-1/2 z-20 glass-button h-11 w-11 -translate-y-1/2 rounded-full text-white"
                aria-label="Next image"
              >
                &gt;
              </button>
            </div>

            <aside className="glass-card m-4 mt-24 mb-6 xl:m-6 xl:mt-24 xl:mb-8 rounded-lg p-5 overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-blue-300">{activeIndex + 1} of {filteredImages.length}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{activeImage.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(activeImage.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    favoriteIds.includes(activeImage.id) ? 'glass-button-active text-white' : 'glass-button text-gray-200'
                  }`}
                >
                  {favoriteIds.includes(activeImage.id) ? 'Saved' : 'Save'}
                </button>
              </div>

              <p className="mt-4 text-gray-300 leading-7">{activeImage.description}</p>

              <dl className="mt-6 grid grid-cols-1 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">Category</dt>
                  <dd className="text-white">{formatLabel(activeImage.category)}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Album</dt>
                  <dd className="text-white">{activeImage.album}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Location</dt>
                  <dd className="text-white">{activeImage.location}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Date</dt>
                  <dd className="text-white">{activeImage.date}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Tags</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {activeImage.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-200">
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setIsSlideshowRunning((currentValue) => !currentValue)}
                  className="glass-button-active px-4 py-3 rounded-lg text-white"
                >
                  {isSlideshowRunning ? 'Pause Slideshow' : 'Start Slideshow'}
                </button>
                <a
                  href={activeImage.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button px-4 py-3 rounded-lg text-center text-white"
                >
                  Open Original
                </a>
                <a
                  href={activeImage.originalUrl}
                  download
                  className="glass-button px-4 py-3 rounded-lg text-center text-white"
                >
                  Download
                </a>
              </div>

              <p className="mt-6 text-xs text-gray-500">
                Use Left/Right arrows to navigate and Esc to close.
              </p>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
