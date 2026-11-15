import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  fetchPublicHolidays,
  HOLIDAY_COUNTRIES,
  type PublicHoliday,
} from '../utils/freeApis';

const PublicHolidaysSection = () => {
  const currentYear = new Date().getFullYear();
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [holidays, setHolidays] = useState<PublicHoliday[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetchPublicHolidays(selectedCountry, selectedYear, controller.signal)
      .then((data) => setHolidays(data))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [selectedCountry, selectedYear]);

  const filteredHolidays = holidays.filter((h) => {
    if (filterType === 'fixed') return h.fixed;
    if (filterType === 'moveable') return !h.fixed;
    return true;
  });

  const nextUpcoming = holidays.find((h) => new Date(h.date) >= new Date());

  return (
    <div className="mt-8">
      {/* Controls */}
      <div className="glass-card rounded-[20px] p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Country selector */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 font-semibold mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
            >
              {HOLIDAY_COUNTRIES.map((country) => (
                <option key={country.code} value={country.code} className="bg-slate-900 text-white">
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year selector */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 font-semibold mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
            >
              {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                <option key={year} value={year} className="bg-slate-900 text-white">
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col">
            <label className="text-xs text-slate-400 font-semibold mb-1">Type</label>
            <div className="flex gap-1.5 bg-black/30 p-1 rounded-lg border border-white/10">
              {['all', 'fixed', 'moveable'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded text-xs capitalize transition ${
                    filterType === type ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400 flex items-center gap-2">
          <span>Source:</span>
          <a
            href="https://date.nager.at"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-300 underline font-mono"
          >
            Nager.Date API (Worldwide) & GOV.UK
          </a>
        </div>
      </div>

      {/* Next Upcoming Highlight */}
      {nextUpcoming && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-purple-900/30 border border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗓️</span>
            <div>
              <p className="text-xs uppercase tracking-wider text-cyan-300 font-semibold">Next Official Holiday</p>
              <h4 className="text-lg font-bold text-white">{nextUpcoming.name} ({nextUpcoming.localName})</h4>
            </div>
          </div>
          <span className="text-sm font-mono font-bold bg-cyan-400/20 text-cyan-200 px-3 py-1.5 rounded-lg border border-cyan-400/30">
            {nextUpcoming.date}
          </span>
        </div>
      )}

      {/* Holiday Cards Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-400">
          <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p>Fetching official public holidays...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHolidays.map((holiday, idx) => (
            <motion.div
              key={`${holiday.date}-${holiday.name}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="glass-card rounded-xl p-4 flex flex-col justify-between hover:border-cyan-400/40 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-mono">
                    {holiday.date}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase font-semibold">
                    {holiday.types?.[0] || 'Public'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug">{holiday.name}</h4>
                {holiday.localName && holiday.localName !== holiday.name && (
                  <p className="text-xs text-slate-400 mt-1 italic">{holiday.localName}</p>
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>{holiday.fixed ? 'Fixed Date' : 'Lunar / Variable'}</span>
                <span>{holiday.global ? 'Nationwide' : 'Regional'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicHolidaysSection;
