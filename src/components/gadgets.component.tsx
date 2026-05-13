import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { gadgets } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import Applications from './applications.component';
import type { EnrichedGadget, Gadget, GadgetState, SetActiveTabProps, Song, SongState } from '../models';
import LazyImage from './lazy-image.component';
import { mergeById, readStudioContent } from '../utils/contentStudio';

const favoriteStorageKey = 'miraj-gadget-favorites';
const gadgetStateStorageKey = 'miraj-gadget-state';
const recentStorageKey = 'miraj-gadget-recently-viewed';
const songStateStorageKey = 'miraj-fav-song-state';
const recentSongsStorageKey = 'miraj-fav-song-recent';
const ownershipOptions = ['Researching', 'Wishlist', 'Owned', 'Recommended'];
const favoriteSongs: Song[] = [
  {
    id: 'song-1',
    embedId: 'dMa_DDiTGKc',
    title: 'TIKI TIKI (Slowed)',
    artist: 'Unique Vibes',
    source: 'YouTube Radio',
    moods: ['Chill', 'Coding', 'Drive'],
    url: 'https://www.youtube.com/watch?v=dMa_DDiTGKc&list=RDdMa_DDiTGKc&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-2',
    embedId: '57KetBnOvJY',
    title: 'SEMPERO (Super Slowed)',
    artist: 'SUKA.',
    source: 'YouTube Radio',
    moods: ['Party', 'Workout'],
    url: 'https://www.youtube.com/watch?v=57KetBnOvJY&list=RD57KetBnOvJY&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-3',
    embedId: 'gNBrDh_AUeQ',
    title: 'HEAVENLY JUMPSTYLE SLOWED',
    artist: 'The Vibe Guide',
    source: 'YouTube Radio',
    moods: ['Chill', 'Drive'],
    url: 'https://www.youtube.com/watch?v=gNBrDh_AUeQ&list=RDgNBrDh_AUeQ&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-4',
    embedId: 'GzExS7WybJg',
    title: 'Vem Vem',
    artist: 'Jmilton - Topic',
    source: 'YouTube Radio',
    moods: ['Party', 'Coding'],
    url: 'https://www.youtube.com/watch?v=GzExS7WybJg&list=RDGzExS7WybJg&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-5',
    embedId: 'zHm8GFK0m-E',
    title: 'MONTAGEM ALQUIMIA',
    artist: 'h6itam',
    source: 'YouTube Radio',
    moods: ['Chill', 'Focus'],
    url: 'https://www.youtube.com/watch?v=zHm8GFK0m-E&list=RDzHm8GFK0m-E&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-6',
    embedId: 'GeszARkWZw0',
    title: 'SLAVA FUNK!',
    artist: 'MVSTERIOUS',
    source: 'YouTube Radio',
    moods: ['Workout', 'Drive'],
    url: 'https://www.youtube.com/watch?v=GeszARkWZw0&list=RDGeszARkWZw0&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-7',
    embedId: '4ywS4E5NmIk',
    title: 'FUNK CRIMINAL (Super Slowed)',
    artist: 'ICEDMANE',
    source: 'YouTube Radio',
    moods: ['Party', 'Drive'],
    url: 'https://www.youtube.com/watch?v=4ywS4E5NmIk&list=RD4ywS4E5NmIk&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-8',
    embedId: 'uzcUJcqGQPw',
    title: 'MATADORA',
    artist: 'DJ Asul',
    source: 'YouTube Radio',
    moods: ['Coding', 'Focus'],
    url: 'https://www.youtube.com/watch?v=uzcUJcqGQPw&list=RDuzcUJcqGQPw&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-9',
    embedId: 'qlzcHe_gusE',
    title: 'SLAY!',
    artist: 'Eternxlkz',
    source: 'YouTube Radio',
    moods: ['Chill', 'Party'],
    url: 'https://www.youtube.com/watch?v=qlzcHe_gusE&list=RDqlzcHe_gusE&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-10',
    embedId: 'gvGQ27rWmg0',
    title: 'MONTAGEM UNKNOWN',
    artist: 'AKXNESHIVA',
    source: 'YouTube Radio',
    moods: ['Workout', 'Party'],
    url: 'https://www.youtube.com/watch?v=gvGQ27rWmg0&list=RDgvGQ27rWmg0&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-11',
    embedId: '8mtxEbvzkHs',
    title: 'Matushka',
    artist: 'Tatyana Kurtukova',
    source: 'YouTube Radio',
    moods: ['Coding', 'Drive'],
    url: 'https://www.youtube.com/watch?v=8mtxEbvzkHs&list=RDGzExS7WybJg&index=3',
    category: 'Funk Songs',
  },
  {
    id: 'song-12',
    embedId: 'MQoColHyGzQ',
    title: 'Saiyaara',
    artist: 'YRF',
    source: 'YouTube Radio',
    moods: ['Party', 'Drive'],
    url: 'https://www.youtube.com/watch?v=MQoColHyGzQ&list=RDMQoColHyGzQ&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-13',
    embedId: 'ozhLT28diEk',
    title: 'Piya Ghar Aavenge',
    artist: 'I-POP Hits',
    source: 'YouTube Radio',
    moods: ['Chill', 'Coding'],
    url: 'https://www.youtube.com/watch?v=ozhLT28diEk&list=RDozhLT28diEk&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-14',
    embedId: 'hHuG7FIKgtc',
    title: 'Ishq',
    artist: 'Artiste First',
    source: 'YouTube Radio',
    moods: ['Workout', 'Drive'],
    url: 'https://www.youtube.com/watch?v=hHuG7FIKgtc&list=RDhHuG7FIKgtc&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-15',
    embedId: '-NHkPJj0wws',
    title: 'Teri Yaad',
    artist: 'Universal Music India',
    source: 'YouTube Radio',
    moods: ['Party', 'Focus'],
    url: 'https://www.youtube.com/watch?v=-NHkPJj0wws&list=RD-NHkPJj0wws&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-16',
    embedId: 'C3njz8sf4aM',
    title: 'Ehsaas',
    artist: 'Universal Music India',
    source: 'YouTube Radio',
    moods: ['Chill', 'Drive'],
    url: 'https://www.youtube.com/watch?v=C3njz8sf4aM&list=RDC3njz8sf4aM&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-17',
    embedId: 'FcRKX6gOmPA',
    title: 'Teri Yaad',
    artist: 'UMusicIndiaVEVO',
    source: 'YouTube Radio',
    moods: ['Coding', 'Focus'],
    url: 'https://www.youtube.com/watch?v=FcRKX6gOmPA&list=RDFcRKX6gOmPA&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-18',
    embedId: 'LZmoCN76MEU',
    title: 'Jalpari',
    artist: 'T-Series',
    source: 'YouTube Radio',
    moods: ['Party', 'Workout'],
    url: 'https://www.youtube.com/watch?v=LZmoCN76MEU&list=RDLZmoCN76MEU&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-19',
    embedId: 'p6ca7gq5H70',
    title: 'Maand',
    artist: 'Zakee.0xLofi',
    source: 'YouTube Radio',
    moods: ['Chill', 'Drive'],
    url: 'https://www.youtube.com/watch?v=p6ca7gq5H70&list=RDp6ca7gq5H70&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-20',
    embedId: 'IAONd2d_PDU',
    title: 'Jaan Se Guzarte Hain',
    artist: 'T-Series',
    source: 'YouTube Radio',
    moods: ['Coding', 'Drive'],
    url: 'https://www.youtube.com/watch?v=IAONd2d_PDU&list=RDIAONd2d_PDU&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-21',
    embedId: 'MWjaK_nW72E',
    title: 'Chupke Chupke Raat Din',
    artist: 'Saregama Ghazal',
    source: 'YouTube Radio',
    moods: ['Party', 'Focus'],
    url: 'https://www.youtube.com/watch?v=MWjaK_nW72E&list=RDMWjaK_nW72E&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-22',
    embedId: '65UEwJVf-5Q',
    title: 'Tu Badla Nahi Hai',
    artist: 'Hot Chillies Music',
    source: 'YouTube Radio',
    moods: ['Chill', 'Party'],
    url: 'https://www.youtube.com/watch?v=65UEwJVf-5Q&list=RDMWjaK_nW72E&index=4',
    category: 'Funk Songs',
  },
  {
    id: 'song-23',
    embedId: 'clzuRgaV5dw',
    title: 'Guzarish',
    artist: 'T-Series',
    source: 'YouTube Radio',
    moods: ['Workout', 'Drive'],
    url: 'https://www.youtube.com/watch?v=clzuRgaV5dw&list=RDclzuRgaV5dw&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-24',
    embedId: 'M5OCLifZK1w',
    title: 'Aarzu',
    artist: 'Noor',
    source: 'YouTube Radio',
    moods: ['Coding', 'Focus'],
    url: 'https://www.youtube.com/watch?v=M5OCLifZK1w&list=RDM5OCLifZK1w&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-25',
    embedId: 'E2JmfVq9qys',
    title: 'Aadat Mega Mashup',
    artist: 'SHUBH Music',
    source: 'YouTube Radio',
    moods: ['Chill', 'Drive'],
    url: 'https://www.youtube.com/watch?v=E2JmfVq9qys&list=RDE2JmfVq9qys&start_radio=1',
    category: 'Funk Songs',
  },
  {
    id: 'song-26',
    embedId: 'g6xvHG8nd5U',
    title: 'The Way I Are (Dance With Somebody)',
    artist: 'Bebe Rexha',
    source: 'YouTube Radio',
    moods: ['English', 'Chill', 'Drive'],
    url: 'https://www.youtube.com/watch?v=g6xvHG8nd5U&list=RDg6xvHG8nd5U&start_radio=1',
    category: 'English Songs',
  },
  {
    id: 'song-27',
    embedId: '6swmTBVI83k',
    title: 'MONTERO (Call Me By Your Name)',
    artist: 'Lil Nas X',
    source: 'YouTube Radio',
    moods: ['English', 'Party', 'Workout'],
    url: 'https://www.youtube.com/watch?v=6swmTBVI83k&list=RD6swmTBVI83k&start_radio=1',
    category: 'English Songs',
  },
  {
    id: 'song-28',
    embedId: 'B9synWjqBn8',
    title: 'FE!N',
    artist: 'Travis Scott',
    source: 'YouTube Radio',
    moods: ['English', 'Chill', 'Focus'],
    url: 'https://www.youtube.com/watch?v=B9synWjqBn8&list=RD6swmTBVI83k&index=3',
    category: 'English Songs',
  },
  {
    id: 'song-29',
    embedId: 'hOHKltAiKXQ',
    title: 'Big Dawgs',
    artist: 'Hanumankind, Kalmi',
    source: 'YouTube Radio',
    moods: ['English', 'Coding', 'Drive'],
    url: 'https://www.youtube.com/watch?v=hOHKltAiKXQ&list=RD6swmTBVI83k&index=4',
    category: 'English Songs',
  },
  {
    id: 'song-30',
    embedId: 'MbJ72KO5khs',
    title: 'Run It Up',
    artist: 'Hanumankind',
    source: 'YouTube Radio',
    moods: ['English', 'Party', 'Drive'],
    url: 'https://www.youtube.com/watch?v=MbJ72KO5khs&list=RD6swmTBVI83k&index=7',
    category: 'English Songs',
  },
  {
    id: 'song-31',
    embedId: 'tt2k8PGm-TI',
    title: 'Dusk Till Dawn',
    artist: 'ZAYN feat. Sia',
    source: 'YouTube Radio',
    moods: ['English', 'Chill', 'Workout'],
    url: 'https://www.youtube.com/watch?v=tt2k8PGm-TI&list=RDtt2k8PGm-TI&start_radio=1',
    category: 'English Songs',
  },
];
const songSortOptions = ['Playlist Order', 'Title', 'Most Played', 'Favorites First'];
const repeatOptions = ['Repeat All', 'Repeat One', 'No Repeat'];
const youtubeIframeApiUrl = 'https://www.youtube.com/iframe_api';
let youtubeIframeApiLoadingPromise: Promise<void> | null = null;

const readStoredValue = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    return JSON.parse(window.localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const writeStoredValue = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getPriceValue = (price = '') => Number(price.replace(/[^\d]/g, '')) || 0;

const getPriceTier = (price) => {
  const value = getPriceValue(price);

  if (value >= 30000) return 'Premium';
  if (value >= 8000) return 'Mid-range';
  return 'Budget';
};

const getBrand = (name) => {
  const brands = ['Keychron', 'Logitech', 'Apple', 'Boult', 'Green Soul', 'ZEBRONICS', 'Marshall', 'MSI', 'ASRock', 'Samsung', 'Portronics'];
  return brands.find((brand) => name.toLowerCase().includes(brand.toLowerCase())) || name.split(' ')[0];
};

const getCategory = (gadget) => {
  const text = `${gadget.name} ${gadget.description} ${(gadget.specs || []).join(' ')}`.toLowerCase();

  if (text.includes('keyboard')) return 'Keyboard';
  if (text.includes('mouse')) return 'Mouse';
  if (text.includes('monitor')) return 'Monitor';
  if (text.includes('earphone') || text.includes('airpods') || text.includes('speaker') || text.includes('audio')) return 'Audio';
  if (text.includes('phone') || text.includes('galaxy')) return 'Phone';
  if (text.includes('desk')) return 'Desk';
  return 'Accessories';
};

const isValidLink = (link) => Boolean(link) && !link.includes('BXXXXXXX') && /^https?:\/\//i.test(link);

const enrichGadget = (gadget, index) => ({
  ...gadget,
  brand: getBrand(gadget.name),
  category: getCategory(gadget),
  priceValue: getPriceValue(gadget.price),
  priceTier: getPriceTier(gadget.price),
  isBuyLinkValid: isValidLink(gadget.link),
  isSourceValid: isValidLink(gadget.source),
  addedIndex: index,
});

type GadgetStateMap = Record<string, GadgetState>;
type SongStateMap = Record<string, SongState>;

const getGadgetState = (gadgetState: GadgetStateMap, id: string): GadgetState => gadgetState[id] || { status: 'Researching', rating: 0 };
const getSongState = (songState: SongStateMap, id: string): SongState => songState[id] || { favorite: false, listenCount: 0, notes: '' };

const loadYoutubeIframeApi = () => {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  const browserWindow = window as typeof window & {
    YT?: { Player: new (element: HTMLIFrameElement, options: Record<string, unknown>) => unknown };
    onYouTubeIframeAPIReady?: () => void;
  };

  if (browserWindow.YT?.Player) {
    return Promise.resolve();
  }

  if (!youtubeIframeApiLoadingPromise) {
    youtubeIframeApiLoadingPromise = new Promise((resolve) => {
      const previousCallback = browserWindow.onYouTubeIframeAPIReady;

      browserWindow.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        resolve();
      };

      if (!document.querySelector(`script[src="${youtubeIframeApiUrl}"]`)) {
        const script = document.createElement('script');
        script.src = youtubeIframeApiUrl;
        script.async = true;
        document.body.appendChild(script);
      }
    });
  }

  return youtubeIframeApiLoadingPromise;
};

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

const StarRating = ({ value, onChange }: StarRatingProps) => (
  <div className="flex gap-1" aria-label={`${value} star rating`}>
    {[1, 2, 3, 4, 5].map((rating) => (
      <button
        key={rating}
        type="button"
        onClick={() => onChange(rating)}
        className={`text-[18px] leading-none ${rating <= value ? 'text-yellow-300' : 'text-gray-500'}`}
        aria-label={`Rate ${rating} stars`}
      >
        *
      </button>
    ))}
  </div>
);

StarRating.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

interface GadgetCardProps {
  gadget: EnrichedGadget;
  index: number;
  viewMode: string;
  isFavorite: boolean;
  isCompared: boolean;
  state: GadgetState;
  onOpen: () => void;
  onToggleFavorite: () => void;
  onToggleCompare: () => void;
  onStatusChange: (status: string) => void;
  onRatingChange: (rating: number) => void;
}

const GadgetCard = ({
  gadget,
  index,
  viewMode,
  isFavorite,
  isCompared,
  state,
  onOpen,
  onToggleFavorite,
  onToggleCompare,
  onStatusChange,
  onRatingChange,
}: GadgetCardProps) => {
  const compact = viewMode === 'list';

  return (
    <motion.article
      variants={fadeIn('up', 'spring', index * 0.04, 0.75)}
      className={`glass-card rounded-[20px] hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${
        compact ? 'p-4 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5' : 'p-5'
      }`}
    >
      <button type="button" onClick={onOpen} className={`relative block w-full ${compact ? 'h-[160px]' : 'h-[200px]'}`}>
        <LazyImage src={gadget.image} alt={gadget.name} className="w-full h-full object-cover rounded-[10px]" skeletonClassName="w-full h-full rounded-[10px]" />
        <span className="absolute left-2 top-2 rounded-full bg-blue-500/70 px-2 py-1 text-xs font-bold uppercase text-white">
          {gadget.category}
        </span>
        <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-white">
          {gadget.priceTier}
        </span>
      </button>

      <div className={compact ? 'min-w-0' : 'mt-5'}>
        <div className="flex items-start justify-between gap-3">
          <button type="button" onClick={onOpen} className="text-left">
            <h3 className="text-timberWolf font-bold text-[22px] font-beckman tracking-[1px]">
              {gadget.name}
            </h3>
            <p className="mt-1 text-sm text-taupe">{gadget.brand}</p>
          </button>
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`h-9 w-9 shrink-0 rounded-full border border-white/20 text-sm font-bold ${
              isFavorite ? 'glass-button-active text-white' : 'glass-button text-timberWolf'
            }`}
            aria-label={isFavorite ? `Remove ${gadget.name} from wishlist` : `Add ${gadget.name} to wishlist`}
          >
            {isFavorite ? 'S' : '+'}
          </button>
        </div>

        <p className="mt-3 text-taupe text-[14px] leading-[22px] font-poppins line-clamp-3">
          {gadget.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {gadget.specs?.slice(0, compact ? 6 : 4).map((spec) => (
            <span key={spec} className="px-3 py-1 glass-button text-timberWolf text-[12px] rounded-[5px] font-poppins">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={state.status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none"
          >
            {ownershipOptions.map((option) => (
              <option key={option} className="text-black" value={option}>
                {option}
              </option>
            ))}
          </select>
          <StarRating value={state.rating || 0} onChange={onRatingChange} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-french font-bold text-[20px] font-beckman">{gadget.price}</div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onToggleCompare}
              className={`px-3 py-2 rounded-[8px] text-[13px] font-poppins ${
                isCompared ? 'glass-button-active text-white' : 'glass-button text-timberWolf'
              }`}
            >
              {isCompared ? 'Comparing' : 'Compare'}
            </button>
            <button type="button" onClick={onOpen} className="glass-button text-timberWolf px-3 py-2 rounded-[8px] text-[13px] font-poppins">
              Details
            </button>
          </div>
        </div>

        {!gadget.isBuyLinkValid && (
          <p className="mt-3 text-xs text-yellow-200">Buy link looks unavailable.</p>
        )}
      </div>
    </motion.article>
  );
};

GadgetCard.propTypes = {
  gadget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    specs: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.string,
    link: PropTypes.string,
    source: PropTypes.string,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    priceTier: PropTypes.string.isRequired,
    isBuyLinkValid: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  viewMode: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isCompared: PropTypes.bool.isRequired,
  state: PropTypes.shape({
    status: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onToggleCompare: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};

const FavSongs = ({ setActiveTab }: SetActiveTabProps) => {
  const playerElementRef = useRef<HTMLIFrameElement | null>(null);
  const youtubePlayerRef = useRef<{ destroy?: () => void; playVideo?: () => void; pauseVideo?: () => void; seekTo?: (seconds: number, allowSeekAhead: boolean) => void } | null>(null);
  const isPlayingRef = useRef(false);
  const activeSongIndexRef = useRef(0);
  const showSongAtOffsetRef = useRef<(offset: number) => void>(() => {});
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songState, setSongState] = useState<SongStateMap>(() => readStoredValue(songStateStorageKey, {}));
  const [recentSongIds, setRecentSongIds] = useState<string[]>(() => readStoredValue(recentSongsStorageKey, []));
  const [songSearch, setSongSearch] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [songSortMode, setSongSortMode] = useState('Playlist Order');
  const [repeatMode, setRepeatMode] = useState('Repeat All');
  const [shuffleMode, setShuffleMode] = useState(false);
  const activeSong = favoriteSongs[activeSongIndex];
  const activeSongState = getSongState(songState, activeSong.id);
  const moodOptions = useMemo(() => ['all', ...new Set(favoriteSongs.flatMap((song) => song.moods))], []);
  const filteredSongs = useMemo(() => {
    const normalizedSearch = songSearch.trim().toLowerCase();

    const matchedSongs = favoriteSongs.filter((song) => {
      const matchesMood = selectedMood === 'all' || song.moods.includes(selectedMood);
      const matchesSearch =
        !normalizedSearch ||
        [song.title, song.artist, song.source, song.category, song.embedId, song.moods.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesMood && matchesSearch;
    });

    return [...matchedSongs].sort((firstSong, secondSong) => {
      const firstState = getSongState(songState, firstSong.id);
      const secondState = getSongState(songState, secondSong.id);

      if (songSortMode === 'Title') {
        return firstSong.title.localeCompare(secondSong.title);
      }

      if (songSortMode === 'Most Played') {
        return secondState.listenCount - firstState.listenCount || firstSong.title.localeCompare(secondSong.title);
      }

      if (songSortMode === 'Favorites First') {
        return Number(Boolean(secondState.favorite)) - Number(Boolean(firstState.favorite)) || firstSong.title.localeCompare(secondSong.title);
      }

      return favoriteSongs.findIndex((song) => song.id === firstSong.id) - favoriteSongs.findIndex((song) => song.id === secondSong.id);
    });
  }, [selectedMood, songSearch, songSortMode, songState]);
  const recentSongs = recentSongIds.map((songId) => favoriteSongs.find((song) => song.id === songId)).filter(Boolean).slice(0, 5);
  const savedSongCount = favoriteSongs.filter((song) => getSongState(songState, song.id).favorite).length;
  const totalListenCount = favoriteSongs.reduce((total, song) => total + getSongState(songState, song.id).listenCount, 0);
  const playlistProgress = ((activeSongIndex + 1) / favoriteSongs.length) * 100;

  const updateSongState = (id: string, changes: Partial<SongState>) => {
    setSongState((currentState) => {
      const nextState = {
        ...currentState,
        [id]: {
          ...getSongState(currentState, id),
          ...changes,
        },
      };

      writeStoredValue(songStateStorageKey, nextState);
      return nextState;
    });
  };

  const rememberSong = (id: string) => {
    setRecentSongIds((currentIds) => {
      const nextIds = [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 5);
      writeStoredValue(recentSongsStorageKey, nextIds);
      return nextIds;
    });
  };

  const playSong = (index: number) => {
    const nextSong = favoriteSongs[index];

    setActiveSongIndex(index);
    setIsPlaying(true);
    rememberSong(nextSong.id);
    updateSongState(nextSong.id, {
      listenCount: getSongState(songState, nextSong.id).listenCount + 1,
    });
  };

  const playRandomSong = () => {
    if (favoriteSongs.length <= 1) return;

    let nextIndex = activeSongIndexRef.current;

    while (nextIndex === activeSongIndexRef.current) {
      nextIndex = Math.floor(Math.random() * favoriteSongs.length);
    }

    playSong(nextIndex);
  };

  const showSongAtOffset = (offset: number) => {
    if (repeatMode === 'Repeat One') {
      youtubePlayerRef.current?.seekTo?.(0, true);
      youtubePlayerRef.current?.playVideo?.();
      setIsPlaying(true);
      rememberSong(activeSong.id);
      updateSongState(activeSong.id, {
        listenCount: getSongState(songState, activeSong.id).listenCount + 1,
      });
      return;
    }

    if (shuffleMode && offset > 0) {
      playRandomSong();
      return;
    }

    const nextIndex = activeSongIndex + offset;

    if (repeatMode === 'No Repeat' && (nextIndex < 0 || nextIndex >= favoriteSongs.length)) {
      setIsPlaying(false);
      return;
    }

    playSong((nextIndex + favoriteSongs.length) % favoriteSongs.length);
  };

  isPlayingRef.current = isPlaying;
  activeSongIndexRef.current = activeSongIndex;
  showSongAtOffsetRef.current = showSongAtOffset;

  const selectSong = (index: number) => {
    playSong(index);
  };

  const shuffleSong = () => {
    setShuffleMode((currentShuffleMode) => {
      const nextShuffleMode = !currentShuffleMode;

      if (nextShuffleMode) {
        playRandomSong();
      }

      return nextShuffleMode;
    });
  };

  useEffect(() => {
    let isMounted = true;

    loadYoutubeIframeApi().then(() => {
      if (!isMounted || !playerElementRef.current || typeof window === 'undefined') return;

      const browserWindow = window as typeof window & {
        YT?: {
          Player: new (
            element: HTMLIFrameElement,
            options: {
              events: {
                onReady: () => void;
                onStateChange: (event: { data: number }) => void;
              };
            },
          ) => { destroy?: () => void; playVideo?: () => void; pauseVideo?: () => void; seekTo?: (seconds: number, allowSeekAhead: boolean) => void };
          PlayerState?: { ENDED: number };
        };
      };

      youtubePlayerRef.current?.destroy?.();
      youtubePlayerRef.current = new browserWindow.YT!.Player(playerElementRef.current, {
        events: {
          onReady: () => {
            if (isPlayingRef.current) {
              youtubePlayerRef.current?.playVideo?.();
            }
          },
          onStateChange: (event) => {
            if (event.data === browserWindow.YT?.PlayerState?.ENDED) {
              showSongAtOffsetRef.current(1);
            }
          },
        },
      });
    });

    return () => {
      isMounted = false;
      youtubePlayerRef.current?.destroy?.();
      youtubePlayerRef.current = null;
    };
  }, [activeSong.embedId]);

  useEffect(() => {
    if (isPlaying) {
      youtubePlayerRef.current?.playVideo?.();
      return;
    }

    youtubePlayerRef.current?.pauseVideo?.();
  }, [isPlaying]);

  const toggleSongFavorite = (id: string) => {
    updateSongState(id, {
      favorite: !getSongState(songState, id).favorite,
    });
  };

  return (
    <div className="relative z-0 min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div variants={textVariant()} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <p className={`${styles.sectionSubText}`}>Funk Songs</p>
          <h2 className={`${styles.sectionHeadTextLight}`}>Fav Songs.</h2>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('gadgets')}
            className="px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 glass-button text-taupe">
            Gadgets
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className="px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 glass-button text-taupe">
            Applications
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className="px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 glass-button-active text-white shadow-lg">
            Fav Songs
          </button>
        </div>

        <div className="mt-8 glass-card rounded-[20px] p-5 sm:p-7">
          <iframe
            ref={playerElementRef}
            key={activeSong.embedId}
            title={activeSong.title}
            src={`https://www.youtube.com/embed/${activeSong.embedId}?autoplay=${isPlaying ? 1 : 0}&controls=0&enablejsapi=1&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media"
            className="absolute h-px w-px opacity-0 pointer-events-none"
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <span className="inline-flex rounded-full bg-blue-500/70 px-3 py-1 text-xs font-bold uppercase text-white">
                {activeSong.category}
              </span>
              <h3 className="mt-4 text-white text-[32px] sm:text-[42px] font-beckman font-bold">
                {activeSong.title}
              </h3>
              <p className="mt-2 text-blue-200 text-[16px]">
                {activeSong.artist} | {activeSong.source}
              </p>
              <p className="mt-3 text-taupe text-[16px] leading-7">
                Audio-only playlist powered by your YouTube links.
              </p>

              <div className="mt-7 rounded-[18px] border border-white/15 bg-black/20 p-3 shadow-[0_18px_45px_rgba(2,6,23,0.25)]">
                <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-300 via-indigo-300 to-fuchsia-300 transition-all duration-500"
                    style={{ width: `${playlistProgress}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                  <button
                    type="button"
                    onClick={() => showSongAtOffset(-1)}
                    className="group rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg sm:px-5"
                    aria-label="Play previous song"
                  >
                    <span className="block text-[11px] uppercase tracking-[2px] text-blue-200">Back</span>
                    <span className="mt-1 block text-sm font-semibold">Prev</span>
                  </button>
                <button
                  type="button"
                  onClick={() => {
                    if (isPlaying) {
                      setIsPlaying(false);
                      return;
                    }

                    playSong(activeSongIndex);
                  }}
                  className="col-span-2 rounded-2xl border border-blue-200/50 bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-fuchsia-500/90 px-6 py-4 text-white shadow-[0_16px_40px_rgba(79,70,229,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(79,70,229,0.45)] sm:col-span-1"
                  aria-label={isPlaying ? 'Pause song' : 'Play song'}
                >
                  <span className="block text-[11px] uppercase tracking-[2px] text-blue-100">{isPlaying ? 'Playing' : 'Ready'}</span>
                  <span className="mt-1 block text-base font-bold">{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                  <button
                    type="button"
                    onClick={() => showSongAtOffset(1)}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg sm:px-5"
                    aria-label="Play next song"
                  >
                    <span className="block text-[11px] uppercase tracking-[2px] text-blue-200">Forward</span>
                    <span className="mt-1 block text-sm font-semibold">Next</span>
                  </button>
                  <button
                    type="button"
                    onClick={shuffleSong}
                    className={`rounded-2xl border px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-5 ${
                      shuffleMode
                        ? 'border-cyan-100/60 bg-cyan-400/30 shadow-[0_14px_35px_rgba(34,211,238,0.25)]'
                        : 'border-cyan-200/30 bg-cyan-400/10 hover:bg-cyan-400/20'
                    }`}
                    aria-label={shuffleMode ? 'Turn shuffle off' : 'Turn shuffle on'}
                  >
                    <span className="block text-[11px] uppercase tracking-[2px] text-cyan-100">{shuffleMode ? 'Random On' : 'Random'}</span>
                    <span className="mt-1 block text-sm font-semibold">{shuffleMode ? 'Shuffle On' : 'Shuffle'}</span>
                  </button>
                <button
                  type="button"
                  onClick={() => toggleSongFavorite(activeSong.id)}
                    className={`rounded-2xl border px-4 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-5 ${
                      activeSongState.favorite
                        ? 'border-amber-200/50 bg-gradient-to-r from-amber-400/80 to-pink-500/80 shadow-[0_14px_35px_rgba(245,158,11,0.25)]'
                        : 'border-white/15 bg-white/10 hover:bg-white/20'
                    }`}
                    aria-label={activeSongState.favorite ? 'Remove song from saved songs' : 'Save song'}
                >
                    <span className="block text-[11px] uppercase tracking-[2px] text-amber-100">Library</span>
                    <span className="mt-1 block text-sm font-semibold">{activeSongState.favorite ? 'Saved' : 'Save'}</span>
                </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {repeatOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRepeatMode(option)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold ${
                      repeatMode === option ? 'glass-button-active text-white' : 'glass-button text-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-300">
                <span className="rounded-full bg-white/10 px-3 py-2">Song {activeSongIndex + 1} of {favoriteSongs.length}</span>
                <span className="rounded-full bg-white/10 px-3 py-2">{activeSongState.listenCount} listens</span>
                <span className="rounded-full bg-white/10 px-3 py-2">{savedSongCount} saved</span>
              </div>
            </div>

            <div className="rounded-[14px] border border-white/10 bg-white/10 p-4">
              <h4 className="text-white text-lg font-semibold">Now Playing</h4>
              <p className="mt-2 text-blue-200 text-sm">{activeSong.embedId}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeSong.moods.map((mood) => (
                  <span key={mood} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
                    {mood}
                  </span>
                ))}
              </div>
              <textarea
                value={activeSongState.notes}
                onChange={(event) => updateSongState(activeSong.id, { notes: event.target.value })}
                placeholder="Notes or favorite lyric snippet"
                rows={4}
                className="mt-4 w-full resize-y rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
              />
              <a href={activeSong.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-blue-300 hover:text-blue-100 text-sm">
                Open on YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 glass-card rounded-[20px] p-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_180px] gap-4">
            <input
              type="search"
              value={songSearch}
              onChange={(event) => setSongSearch(event.target.value)}
              placeholder="Search song, artist, source, tag, or video ID"
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
            />
            <select value={songSortMode} onChange={(event) => setSongSortMode(event.target.value)} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
              {songSortOptions.map((option) => (
                <option key={option} className="text-black" value={option}>{option}</option>
              ))}
            </select>
            <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-gray-200">
              {filteredSongs.length} songs | {totalListenCount} plays
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {moodOptions.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium ${
                  selectedMood === mood ? 'glass-button-active text-white' : 'glass-button text-gray-300'
                }`}
              >
                {mood === 'all' ? 'All moods' : mood}
              </button>
            ))}
          </div>

          {recentSongs.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-300">
              <span>Recently played:</span>
              {recentSongs.map((song) => (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => selectSong(favoriteSongs.findIndex((currentSong) => currentSong.id === song.id))}
                  className="text-blue-300 hover:text-blue-100"
                >
                  {song.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredSongs.map((song) => {
            const songIndex = favoriteSongs.findIndex((currentSong) => currentSong.id === song.id);
            const currentSongState = getSongState(songState, song.id);

            return (
            <article
              key={song.id}
              className={`rounded-[16px] p-5 transition-all duration-300 ${
                activeSong.id === song.id ? 'glass-button-active text-white' : 'glass-card text-taupe hover:text-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <button type="button" onClick={() => selectSong(songIndex)} className="min-w-0 text-left">
                  <span className="text-xs uppercase tracking-[2px] text-blue-200">{song.category}</span>
                  <h4 className="mt-3 text-[20px] font-beckman font-bold">{song.title}</h4>
                  <p className="mt-2 text-sm opacity-90">{song.artist} | {song.source}</p>
                </button>
                <button
                  type="button"
                  onClick={() => toggleSongFavorite(song.id)}
                  className={`h-9 w-9 shrink-0 rounded-full border border-white/20 text-sm font-bold ${
                    currentSongState.favorite ? 'glass-button-active text-white' : 'glass-button text-timberWolf'
                  }`}
                  aria-label={currentSongState.favorite ? `Remove ${song.title} from saved songs` : `Save ${song.title}`}
                >
                  {currentSongState.favorite ? 'S' : '+'}
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {song.moods.map((mood) => (
                  <span key={mood} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
                    {mood}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                <span>{currentSongState.listenCount} listens</span>
                <button type="button" onClick={() => selectSong(songIndex)} className="text-blue-300 hover:text-blue-100">
                  Listen
                </button>
              </div>

              <textarea
                value={currentSongState.notes}
                onChange={(event) => updateSongState(song.id, { notes: event.target.value })}
                placeholder="Notes or lyric snippet"
                rows={3}
                className="mt-4 w-full resize-y rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
              />
            </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

FavSongs.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

const Gadgets = () => {
  const [activeTab, setActiveTab] = useState('gadgets');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortMode, setSortMode] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readStoredValue(favoriteStorageKey, []));
  const [gadgetState, setGadgetState] = useState<GadgetStateMap>(() => readStoredValue(gadgetStateStorageKey, {}));
  const [recentIds, setRecentIds] = useState<string[]>(() => readStoredValue(recentStorageKey, []));
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [activeGadgetId, setActiveGadgetId] = useState<string | null>(null);

  const enrichedGadgets = useMemo(() => mergeById(gadgets as Gadget[], readStudioContent().gadgets).map(enrichGadget), []);
  const categories = useMemo(() => ['all', ...new Set(enrichedGadgets.map((gadget) => gadget.category))], [enrichedGadgets]);
  const brands = useMemo(() => ['all', ...new Set(enrichedGadgets.map((gadget) => gadget.brand))], [enrichedGadgets]);

  const filteredGadgets = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchedGadgets = enrichedGadgets.filter((gadget) => {
      const matchesCategory = selectedCategory === 'all' || gadget.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || gadget.brand === selectedBrand;
      const matchesSearch =
        !normalizedSearch ||
        [gadget.name, gadget.description, gadget.brand, gadget.category, gadget.price, gadget.priceTier, ...(gadget.specs || [])]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesBrand && matchesSearch;
    });

    return [...matchedGadgets].sort((firstGadget, secondGadget) => {
      if (sortMode === 'priceLow') return firstGadget.priceValue - secondGadget.priceValue;
      if (sortMode === 'priceHigh') return secondGadget.priceValue - firstGadget.priceValue;
      if (sortMode === 'brand') return firstGadget.brand.localeCompare(secondGadget.brand) || firstGadget.name.localeCompare(secondGadget.name);
      if (sortMode === 'name') return firstGadget.name.localeCompare(secondGadget.name);
      return secondGadget.addedIndex - firstGadget.addedIndex;
    });
  }, [enrichedGadgets, searchTerm, selectedBrand, selectedCategory, sortMode]);

  const categoryCounts = useMemo(
    () =>
      enrichedGadgets.reduce(
        (counts, gadget) => ({
          ...counts,
          [gadget.category]: (counts[gadget.category] || 0) + 1,
        }),
        { all: enrichedGadgets.length },
      ),
    [enrichedGadgets],
  );

  const recentGadgets = recentIds.map((id) => enrichedGadgets.find((gadget) => gadget.id === id)).filter(Boolean).slice(0, 5);
  const activeGadget = enrichedGadgets.find((gadget) => gadget.id === activeGadgetId);
  const comparedGadgets = compareIds.map((id) => enrichedGadgets.find((gadget) => gadget.id === id)).filter(Boolean);

  const updateGadgetState = (id: string, changes: Partial<GadgetState>) => {
    setGadgetState((currentState) => {
      const nextState = {
        ...currentState,
        [id]: {
          ...getGadgetState(currentState, id),
          ...changes,
        },
      };

      writeStoredValue(gadgetStateStorageKey, nextState);
      return nextState;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [id, ...currentIds];
      writeStoredValue(favoriteStorageKey, nextIds);
      return nextIds;
    });
  };

  const rememberGadget = (id: string) => {
    setRecentIds((currentIds) => {
      const nextIds = [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 8);
      writeStoredValue(recentStorageKey, nextIds);
      return nextIds;
    });
  };

  const openGadget = (id: string) => {
    setActiveGadgetId(id);
    rememberGadget(id);
  };

  const toggleCompare = (id: string) => {
    setCompareIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((currentId) => currentId !== id);
      }

      if (currentIds.length >= 4) {
        return currentIds;
      }

      return [...currentIds, id];
    });
  };

  if (activeTab === 'software') {
    return <Applications setActiveTab={setActiveTab} />;
  }

  if (activeTab === 'songs') {
    return <FavSongs setActiveTab={setActiveTab} />;
  }

  return (
    <div className="relative z-0 min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div variants={textVariant()} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <p className={`${styles.sectionSubText}`}>My Tech Arsenal</p>
          <h2 className={`${styles.sectionHeadTextLight}`}>Gadgets.</h2>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('gadgets')}
            className={`px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 ${
              activeTab === 'gadgets' ? 'glass-button-active text-white shadow-lg' : 'glass-button text-taupe'
            }`}>
            Gadgets
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 ${
              activeTab === 'software' ? 'glass-button-active text-white shadow-lg' : 'glass-button text-taupe'
            }`}>
            Applications
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className={`px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 ${
              activeTab === 'songs' ? 'glass-button-active text-white shadow-lg' : 'glass-button text-taupe'
            }`}>
            Fav Songs
          </button>
        </div>

        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
          Here are the gadgets I use daily for development, design, and productivity.
        </motion.p>

        <div className="mt-8 glass-card rounded-[20px] p-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_180px_180px] gap-4">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name, specs, price, brand"
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
            />
            <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
              {brands.map((brand) => (
                <option key={brand} className="text-black" value={brand}>
                  {brand === 'all' ? 'All brands' : brand}
                </option>
              ))}
            </select>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
              <option className="text-black" value="newest">Newest</option>
              <option className="text-black" value="priceLow">Price low-high</option>
              <option className="text-black" value="priceHigh">Price high-low</option>
              <option className="text-black" value="brand">Brand</option>
              <option className="text-black" value="name">Name</option>
            </select>
            <div className="grid grid-cols-2 gap-2">
              {['grid', 'list'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`rounded-lg px-3 py-2 text-sm ${viewMode === mode ? 'glass-button-active text-white' : 'glass-button text-taupe'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium ${
                  selectedCategory === category ? 'glass-button-active text-white' : 'glass-button text-gray-300'
                }`}
              >
                {category} ({categoryCounts[category] || 0})
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-300">
            <span>{filteredGadgets.length} of {enrichedGadgets.length} gadgets</span>
            <span>|</span>
            <span>{favoriteIds.length} wishlist</span>
            {recentGadgets.length > 0 && (
              <>
                <span>|</span>
                <span>Recently viewed:</span>
                {recentGadgets.map((gadget) => (
                  <button key={gadget.id} type="button" onClick={() => openGadget(gadget.id)} className="text-blue-300 hover:text-blue-100">
                    {gadget.name}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

        {comparedGadgets.length > 0 && (
          <section className="mt-8 glass-card rounded-[20px] p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-white text-xl font-semibold">Compare Gadgets ({comparedGadgets.length}/4)</h3>
              <button type="button" onClick={() => setCompareIds([])} className="glass-button px-4 py-2 rounded-lg text-white">
                Clear
              </button>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-300">
                <thead className="text-white">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Brand</th>
                    <th className="p-3">Specs</th>
                    <th className="p-3">Links</th>
                  </tr>
                </thead>
                <tbody>
                  {comparedGadgets.map((gadget) => (
                    <tr key={gadget.id} className="border-t border-white/10">
                      <td className="p-3 text-white">{gadget.name}</td>
                      <td className="p-3">{gadget.price}</td>
                      <td className="p-3">{gadget.brand}</td>
                      <td className="p-3">{gadget.specs?.slice(0, 3).join(', ')}</td>
                      <td className="p-3">
                        {gadget.isBuyLinkValid && <a href={gadget.link} target="_blank" rel="noopener noreferrer" className="text-blue-300">Buy</a>}
                        {gadget.isSourceValid && <a href={gadget.source} target="_blank" rel="noopener noreferrer" className="ml-3 text-blue-300">Official</a>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className={`mt-[50px] ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7' : 'grid grid-cols-1 gap-5'}`}>
          {filteredGadgets.map((gadget, index) => (
            <GadgetCard
              key={gadget.id}
              gadget={gadget}
              index={index}
              viewMode={viewMode}
              isFavorite={favoriteIds.includes(gadget.id)}
              isCompared={compareIds.includes(gadget.id)}
              state={getGadgetState(gadgetState, gadget.id)}
              onOpen={() => openGadget(gadget.id)}
              onToggleFavorite={() => toggleFavorite(gadget.id)}
              onToggleCompare={() => toggleCompare(gadget.id)}
              onStatusChange={(status) => updateGadgetState(gadget.id, { status })}
              onRatingChange={(rating) => updateGadgetState(gadget.id, { rating })}
            />
          ))}
        </div>

        {activeGadget && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
            <div className="glass-card max-w-5xl mx-auto mt-20 rounded-[20px] p-5 sm:p-8">
              <div className="flex justify-end">
                <button type="button" onClick={() => setActiveGadgetId(null)} className="glass-button px-4 py-2 rounded-full text-white">
                  Close
                </button>
              </div>
              <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
                <LazyImage src={activeGadget.image} alt={activeGadget.name} className="w-full max-h-[520px] object-contain rounded-[14px] bg-white/5" skeletonClassName="w-full max-h-[520px] rounded-[14px] bg-white/5" />
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-500/70 px-3 py-1 text-xs font-bold uppercase text-white">{activeGadget.category}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">{activeGadget.priceTier}</span>
                    {!activeGadget.isBuyLinkValid && <span className="rounded-full bg-yellow-500/30 px-3 py-1 text-xs text-yellow-100">Buy link unavailable</span>}
                  </div>
                  <h3 className="mt-5 text-white text-3xl font-beckman font-bold">{activeGadget.name}</h3>
                  <p className="mt-2 text-taupe">{activeGadget.brand} | {activeGadget.price}</p>
                  <p className="mt-5 text-gray-200 leading-8">{activeGadget.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {activeGadget.specs?.map((spec) => (
                      <span key={spec} className="glass-button rounded-[6px] px-3 py-1 text-xs text-timberWolf">{spec}</span>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      value={getGadgetState(gadgetState, activeGadget.id).status}
                      onChange={(event) => updateGadgetState(activeGadget.id, { status: event.target.value })}
                      className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none"
                    >
                      {ownershipOptions.map((option) => (
                        <option key={option} className="text-black" value={option}>{option}</option>
                      ))}
                    </select>
                    <StarRating
                      value={getGadgetState(gadgetState, activeGadget.id).rating || 0}
                      onChange={(rating) => updateGadgetState(activeGadget.id, { rating })}
                    />
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {activeGadget.isBuyLinkValid && (
                      <a href={activeGadget.link} target="_blank" rel="noopener noreferrer" className="glass-button-active px-5 py-3 rounded-lg text-white">
                        Buy
                      </a>
                    )}
                    {activeGadget.isSourceValid && (
                      <a href={activeGadget.source} target="_blank" rel="noopener noreferrer" className="glass-button px-5 py-3 rounded-lg text-white">
                        Official Site
                      </a>
                    )}
                    <button type="button" onClick={() => toggleFavorite(activeGadget.id)} className="glass-button px-5 py-3 rounded-lg text-white">
                      {favoriteIds.includes(activeGadget.id) ? 'Remove Wishlist' : 'Add Wishlist'}
                    </button>
                    <button type="button" onClick={() => toggleCompare(activeGadget.id)} className="glass-button px-5 py-3 rounded-lg text-white">
                      {compareIds.includes(activeGadget.id) ? 'Remove Compare' : 'Compare'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gadgets;
