import { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
}

const LazyImage = ({
  src,
  alt,
  className = '',
  skeletonClassName = '',
  fallbackSrc = 'https://via.placeholder.com/800x600?text=Image+Not+Available',
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div className={`relative overflow-hidden ${skeletonClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setImageSrc(fallbackSrc);
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default LazyImage;
