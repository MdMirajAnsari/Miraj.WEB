import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { gadgets } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import Applications from './Applications';

const favoriteStorageKey = 'miraj-gadget-favorites';
const gadgetStateStorageKey = 'miraj-gadget-state';
const recentStorageKey = 'miraj-gadget-recently-viewed';
const ownershipOptions = ['Researching', 'Wishlist', 'Owned', 'Recommended'];

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

const getGadgetState = (gadgetState, id) => gadgetState[id] || { status: 'Researching', rating: 0 };

const StarRating = ({ value, onChange }) => (
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
}) => {
  const compact = viewMode === 'list';

  return (
    <motion.article
      variants={fadeIn('up', 'spring', index * 0.04, 0.75)}
      className={`glass-card rounded-[20px] hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${
        compact ? 'p-4 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5' : 'p-5'
      }`}
    >
      <button type="button" onClick={onOpen} className={`relative block w-full ${compact ? 'h-[160px]' : 'h-[200px]'}`}>
        <img src={gadget.image} alt={gadget.name} className="w-full h-full object-cover rounded-[10px]" />
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

const Gadgets = () => {
  const [activeTab, setActiveTab] = useState('gadgets');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortMode, setSortMode] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredValue(favoriteStorageKey, []));
  const [gadgetState, setGadgetState] = useState(() => readStoredValue(gadgetStateStorageKey, {}));
  const [recentIds, setRecentIds] = useState(() => readStoredValue(recentStorageKey, []));
  const [compareIds, setCompareIds] = useState([]);
  const [activeGadgetId, setActiveGadgetId] = useState(null);

  const enrichedGadgets = useMemo(() => gadgets.map(enrichGadget), []);
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

  const updateGadgetState = (id, changes) => {
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

  const toggleFavorite = (id) => {
    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [id, ...currentIds];
      writeStoredValue(favoriteStorageKey, nextIds);
      return nextIds;
    });
  };

  const rememberGadget = (id) => {
    setRecentIds((currentIds) => {
      const nextIds = [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 8);
      writeStoredValue(recentStorageKey, nextIds);
      return nextIds;
    });
  };

  const openGadget = (id) => {
    setActiveGadgetId(id);
    rememberGadget(id);
  };

  const toggleCompare = (id) => {
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
                <img src={activeGadget.image} alt={activeGadget.name} className="w-full max-h-[520px] object-contain rounded-[14px] bg-white/5" />
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
