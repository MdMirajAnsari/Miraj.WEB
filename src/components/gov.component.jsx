import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

const favoriteStorageKey = 'miraj-gov-favorites';
const recentStorageKey = 'miraj-gov-recent-links';
const pinnedIds = [3, 8, 9, 10, 12, 6];

const govLinks = [
  {
    id: 1,
    title: 'Official Government Portal',
    description: 'Access government services, certificates, and public information.',
    url: 'https://www.india.gov.in',
    category: 'General',
    department: 'Government of India',
    scope: 'Central',
    type: 'Portal',
    keywords: ['services', 'certificates', 'public information'],
  },
  {
    id: 2,
    title: 'Ministry of Finance',
    description: 'Latest policies, budgets, and financial updates from the government.',
    url: 'https://www.finmin.nic.in',
    category: 'Finance',
    department: 'Ministry of Finance',
    scope: 'Central',
    type: 'Official',
    keywords: ['budget', 'policy', 'finance'],
  },
  {
    id: 3,
    title: 'Income Tax Department',
    description: 'File taxes, check refunds, and access taxpayer services online.',
    url: 'https://www.incometax.gov.in',
    category: 'Finance',
    department: 'Income Tax Department',
    scope: 'Central',
    type: 'Portal',
    sensitive: true,
    keywords: ['tax', 'refund', 'login', 'pan'],
  },
  {
    id: 4,
    title: 'Ministry of Home Affairs',
    description: 'Home ministry announcements, e-passport, and security updates.',
    url: 'https://www.mha.gov.in',
    category: 'Identity',
    department: 'Ministry of Home Affairs',
    scope: 'Central',
    type: 'Official',
    keywords: ['security', 'passport', 'home ministry'],
  },
  {
    id: 5,
    title: 'Digital India',
    description: 'Initiative for digital services, records, and governance resources.',
    url: 'https://www.digitalindia.gov.in',
    category: 'General',
    department: 'Digital India',
    scope: 'Central',
    type: 'Portal',
    keywords: ['digital services', 'records', 'governance'],
  },
  {
    id: 6,
    title: 'Election Commission of India',
    description: 'Voter information, election updates, forms, and official ECI resources.',
    url: 'https://www.eci.gov.in/',
    category: 'Identity',
    department: 'Election Commission',
    scope: 'Central',
    type: 'Official',
    keywords: ['voter', 'election', 'eci'],
  },
  {
    id: 7,
    title: 'MF Central',
    description: 'Investor sign-in for mutual fund portfolio and service requests.',
    url: 'https://app.mfcentral.com/investor/signin',
    category: 'Finance',
    department: 'MF Central',
    scope: 'Private/Partner',
    type: 'Login',
    sensitive: true,
    keywords: ['mutual fund', 'investor', 'portfolio'],
  },
  {
    id: 8,
    title: 'EPFO Member Passbook',
    description: 'View EPF passbook details and member contribution history.',
    url: 'https://passbook.epfindia.gov.in/MemberPassBook/Login',
    category: 'Employment',
    department: 'EPFO',
    scope: 'Central',
    type: 'Login',
    sensitive: true,
    keywords: ['epf', 'pf', 'passbook', 'uan'],
  },
  {
    id: 9,
    title: 'EPFO Unified Member Portal',
    description: 'Member services for UAN, EPF claims, profile, and account details.',
    url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
    category: 'Employment',
    department: 'EPFO',
    scope: 'Central',
    type: 'Login',
    sensitive: true,
    keywords: ['epf', 'uan', 'claim', 'member'],
  },
  {
    id: 10,
    title: 'Ministry of Corporate Affairs',
    description: 'Company services, MCA filings, master data, and corporate resources.',
    url: 'https://www.mca.gov.in/content/mca/global/en/home.html',
    category: 'Company',
    department: 'MCA',
    scope: 'Central',
    type: 'Portal',
    keywords: ['company', 'filings', 'mca'],
  },
  {
    id: 11,
    title: 'Sanchar Saathi',
    description: 'Telecom safety services for mobile connections and device reporting.',
    url: 'https://www.sancharsaathi.gov.in/',
    category: 'Telecom',
    department: 'Department of Telecommunications',
    scope: 'Central',
    type: 'Portal',
    keywords: ['mobile', 'telecom', 'device'],
  },
  {
    id: 12,
    title: 'ABHA Health ID',
    description: 'Create or manage ABHA health ID under India digital health services.',
    url: 'https://healthid.ndhm.gov.in/',
    category: 'Health',
    department: 'Ayushman Bharat Digital Mission',
    scope: 'Central',
    type: 'Login',
    sensitive: true,
    keywords: ['abha', 'health id', 'ndhm'],
  },
  {
    id: 13,
    title: 'VTU EDDTS',
    description: 'VTU electronic document delivery and tracking system.',
    url: 'https://eddts.vtu.ac.in/',
    category: 'Education',
    department: 'VTU',
    scope: 'State',
    type: 'Portal',
    keywords: ['vtu', 'documents', 'education'],
  },
  {
    id: 14,
    title: 'Bihar Bhumi',
    description: 'Bihar land records, mutation services, and property information.',
    url: 'https://biharbhumi.bihar.gov.in/Biharbhumi/',
    category: 'Land',
    department: 'Bihar Revenue Department',
    scope: 'State',
    type: 'Portal',
    keywords: ['land records', 'mutation', 'bihar'],
  },
  {
    id: 15,
    title: 'Experian Credit Report',
    description: 'Consumer portal for Experian credit report and verification services.',
    url: 'https://consumer.experian.in/ECV-OLN/view/angular/#/',
    category: 'Credit',
    department: 'Experian',
    scope: 'Private/Partner',
    type: 'Login',
    sensitive: true,
    keywords: ['credit report', 'cibil', 'verification'],
  },
  {
    id: 16,
    title: 'PMMVY',
    description: 'Pradhan Mantri Matru Vandana Yojana portal for maternity benefit services.',
    url: 'https://pmmvy.wcd.gov.in/',
    category: 'Health',
    department: 'Ministry of Women and Child Development',
    scope: 'Central',
    type: 'Portal',
    keywords: ['maternity', 'benefit', 'women child'],
  },
];

const readStoredArray = (key) => {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

const writeStoredArray = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const formatLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const GovCard = ({
  link,
  index,
  viewMode,
  isFavorite,
  onOpen,
  onDetails,
  onFavorite,
  onCopy,
}) => {
  const compact = viewMode === 'list';

  return (
    <motion.article
      variants={fadeIn('up', 'spring', index * 0.05, 0.75)}
      className={`glass-card rounded-[20px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${
        compact ? 'p-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4' : 'p-6'
      }`}
    >
      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 rounded-full bg-blue-500/70 text-white text-xs font-bold uppercase">{link.category}</span>
          <span className="px-2 py-1 rounded-full bg-white/10 text-gray-100 text-xs">{link.type}</span>
          <span className="px-2 py-1 rounded-full bg-white/10 text-gray-100 text-xs">{link.scope}</span>
          {link.isPinned && <span className="px-2 py-1 rounded-full bg-amber-500/70 text-white text-xs font-bold">Pinned</span>}
          {link.sensitive && <span className="px-2 py-1 rounded-full bg-red-500/40 text-red-100 text-xs">Sensitive</span>}
        </div>

        <h3 className="text-[20px] font-beckman font-bold text-white">{link.title}</h3>
        <p className="mt-2 text-slate-300 text-[14px]">{link.department}</p>
        <p className="mt-3 text-slate-500 text-[15px] leading-[24px]">{link.description}</p>
        <p className="mt-3 text-xs text-yellow-100">Opens external website. Check URL before entering personal details.</p>
      </div>

      <div className={`mt-5 flex flex-wrap gap-2 ${compact ? 'md:mt-0 md:justify-end md:items-start' : ''}`}>
        <button type="button" onClick={onOpen} className="glass-button-active px-4 py-2 rounded-lg text-white text-sm">
          Open
        </button>
        <button type="button" onClick={onCopy} className="glass-button px-4 py-2 rounded-lg text-white text-sm">
          Copy
        </button>
        <button
          type="button"
          onClick={onFavorite}
          className={`px-4 py-2 rounded-lg text-sm ${isFavorite ? 'glass-button-active text-white' : 'glass-button text-white'}`}
        >
          {isFavorite ? 'Saved' : 'Favorite'}
        </button>
        <button type="button" onClick={onDetails} className="glass-button px-4 py-2 rounded-lg text-white text-sm">
          Details
        </button>
      </div>
    </motion.article>
  );
};

GovCard.propTypes = {
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    scope: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sensitive: PropTypes.bool,
    isPinned: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  viewMode: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

const Gov = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [sortMode, setSortMode] = useState('pinned');
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteIds, setFavoriteIds] = useState(() => readStoredArray(favoriteStorageKey));
  const [recentIds, setRecentIds] = useState(() => readStoredArray(recentStorageKey));
  const [activeLinkId, setActiveLinkId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const enrichedLinks = useMemo(
    () => govLinks.map((link, index) => ({ ...link, addedIndex: index, isPinned: pinnedIds.includes(link.id) })),
    [],
  );

  const categories = useMemo(() => ['all', ...new Set(enrichedLinks.map((link) => link.category))], [enrichedLinks]);
  const scopes = useMemo(() => ['all', ...new Set(enrichedLinks.map((link) => link.scope))], [enrichedLinks]);

  const categoryCounts = useMemo(
    () =>
      enrichedLinks.reduce(
        (counts, link) => ({
          ...counts,
          [link.category]: (counts[link.category] || 0) + 1,
        }),
        { all: enrichedLinks.length },
      ),
    [enrichedLinks],
  );

  const filteredLinks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const matchedLinks = enrichedLinks.filter((link) => {
      const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
      const matchesScope = selectedScope === 'all' || link.scope === selectedScope;
      const matchesSearch =
        !normalizedSearch ||
        [link.title, link.description, link.department, link.category, link.type, link.scope, link.url, ...(link.keywords || [])]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesScope && matchesSearch;
    });

    return [...matchedLinks].sort((firstLink, secondLink) => {
      if (sortMode === 'name') return firstLink.title.localeCompare(secondLink.title);
      if (sortMode === 'category') return firstLink.category.localeCompare(secondLink.category) || firstLink.title.localeCompare(secondLink.title);
      if (sortMode === 'recent') return secondLink.addedIndex - firstLink.addedIndex;
      if (sortMode === 'favorites') return Number(favoriteIds.includes(secondLink.id)) - Number(favoriteIds.includes(firstLink.id)) || firstLink.title.localeCompare(secondLink.title);
      return Number(secondLink.isPinned) - Number(firstLink.isPinned) || firstLink.title.localeCompare(secondLink.title);
    });
  }, [enrichedLinks, favoriteIds, searchTerm, selectedCategory, selectedScope, sortMode]);

  const pinnedLinks = enrichedLinks.filter((link) => link.isPinned).slice(0, 6);
  const recentLinks = recentIds.map((id) => enrichedLinks.find((link) => link.id === id)).filter(Boolean).slice(0, 5);
  const activeLink = enrichedLinks.find((link) => link.id === activeLinkId);

  const rememberLink = (id) => {
    setRecentIds((currentIds) => {
      const nextIds = [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 8);
      writeStoredArray(recentStorageKey, nextIds);
      return nextIds;
    });
  };

  const openLink = (link) => {
    rememberLink(link.id);
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const toggleFavorite = (id) => {
    setFavoriteIds((currentIds) => {
      const nextIds = currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [id, ...currentIds];
      writeStoredArray(favoriteStorageKey, nextIds);
      return nextIds;
    });
  };

  const copyLink = async (link) => {
    await navigator.clipboard.writeText(link.url);
    setCopiedId(link.id);
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="glass-card mt-12 mb-20 rounded-[30px] p-6">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-slate-300`}>Government Links</p>
        <h2 className={`${styles.sectionHeadTextLight} text-white`}>Gov Resources</h2>
      </motion.div>

      <motion.p variants={fadeIn('', '', 0.1, 1)} className="mt-4 text-slate-400 text-[18px] max-w-3xl leading-[30px]">
        Find official government websites and public services in one place.
      </motion.p>

      <div className="mt-8 glass-card rounded-[20px] p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_170px_170px_170px] gap-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search service, department, keyword, URL"
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-blue-300"
          />
          <select value={selectedScope} onChange={(event) => setSelectedScope(event.target.value)} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
            {scopes.map((scope) => (
              <option key={scope} className="text-black" value={scope}>
                {scope === 'all' ? 'All scopes' : scope}
              </option>
            ))}
          </select>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value)} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none">
            <option className="text-black" value="pinned">Pinned first</option>
            <option className="text-black" value="name">Name</option>
            <option className="text-black" value="category">Category</option>
            <option className="text-black" value="recent">Recently added</option>
            <option className="text-black" value="favorites">Favorites first</option>
          </select>
          <div className="grid grid-cols-2 gap-2">
            {['grid', 'list'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-lg px-3 py-2 text-sm ${viewMode === mode ? 'glass-button-active text-white' : 'glass-button text-white'}`}
              >
                {formatLabel(mode)}
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
              {formatLabel(category)} ({categoryCounts[category] || 0})
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-300">
          <span>{filteredLinks.length} of {enrichedLinks.length} links</span>
          <span>|</span>
          <span>{favoriteIds.length} favorites</span>
          {recentLinks.length > 0 && (
            <>
              <span>|</span>
              <span>Recently opened:</span>
              {recentLinks.map((link) => (
                <button key={link.id} type="button" onClick={() => openLink(link)} className="text-blue-300 hover:text-blue-100">
                  {link.title}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      <section className="mt-8">
        <h3 className="text-white text-xl font-semibold mb-4">Pinned Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pinnedLinks.map((link) => (
            <button key={link.id} type="button" onClick={() => openLink(link)} className="glass-card rounded-[16px] p-4 text-left hover:-translate-y-1 transition-transform">
              <span className="text-xs text-blue-300 uppercase font-bold">{link.department}</span>
              <p className="mt-2 text-white font-semibold">{link.title}</p>
            </button>
          ))}
        </div>
      </section>

      <div className={`mt-10 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 gap-4'}`}>
        {filteredLinks.map((link, index) => (
          <GovCard
            key={link.id}
            link={link}
            index={index}
            viewMode={viewMode}
            isFavorite={favoriteIds.includes(link.id)}
            onOpen={() => openLink(link)}
            onDetails={() => {
              setActiveLinkId(link.id);
              rememberLink(link.id);
            }}
            onFavorite={() => toggleFavorite(link.id)}
            onCopy={() => copyLink(link)}
          />
        ))}
      </div>

      {copiedId && (
        <div className="fixed bottom-5 right-5 z-50 glass-card rounded-lg px-4 py-3 text-white">
          Link copied
        </div>
      )}

      {activeLink && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="glass-card max-w-3xl mx-auto mt-24 rounded-[20px] p-6">
            <div className="flex justify-end">
              <button type="button" onClick={() => setActiveLinkId(null)} className="glass-button px-4 py-2 rounded-full text-white">
                Close
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/70 text-white text-xs font-bold uppercase">{activeLink.category}</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">{activeLink.type}</span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">{activeLink.scope}</span>
              {activeLink.sensitive && <span className="px-3 py-1 rounded-full bg-red-500/40 text-red-100 text-xs">Sensitive login/data</span>}
            </div>
            <h3 className="mt-5 text-3xl font-beckman font-bold text-white">{activeLink.title}</h3>
            <p className="mt-2 text-slate-300">{activeLink.department}</p>
            <p className="mt-5 text-slate-200 leading-8">{activeLink.description}</p>
            <div className="mt-5 rounded-lg border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm text-yellow-100">
              This opens an external website. For login, finance, health, PF, and credit services, verify the URL before entering personal information.
            </div>
            <div className="mt-6 break-all rounded-lg bg-white/10 p-4 text-sm text-gray-200">{activeLink.url}</div>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => openLink(activeLink)} className="glass-button-active px-5 py-3 rounded-lg text-white">
                Open
              </button>
              <button type="button" onClick={() => copyLink(activeLink)} className="glass-button px-5 py-3 rounded-lg text-white">
                Copy link
              </button>
              <button type="button" onClick={() => toggleFavorite(activeLink.id)} className="glass-button px-5 py-3 rounded-lg text-white">
                {favoriteIds.includes(activeLink.id) ? 'Remove favorite' : 'Add favorite'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Gov, 'gov');
