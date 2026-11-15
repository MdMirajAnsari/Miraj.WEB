import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDomainsDbAccountInfo } from '../utils/domainsdb';
import type { DomainsDbAccountInfo } from '../models';

const DomainsStatsCard = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<DomainsDbAccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [quickDomain, setQuickDomain] = useState('');

  useEffect(() => {
    let mounted = true;
    getDomainsDbAccountInfo()
      .then((info) => {
        if (mounted) setAccount(info);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickDomain.trim()) {
      navigate('/domains');
    } else {
      navigate('/domains');
    }
  };

  return (
    <article className="glass-card rounded-lg p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm uppercase tracking-[2px] text-slate-300">DomainsDB API</p>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            {account?.license ? `${account.license.toUpperCase()} TIER` : 'CONNECTED'}
          </span>
        </div>

        {loading ? (
          <p className="mt-4 text-slate-300">Connecting to DomainsDB...</p>
        ) : (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/10 p-3">
                <p className="text-2xl font-black text-white">{account?.calls_made ?? 0}</p>
                <p className="text-xs uppercase tracking-[1px] text-slate-300">API Calls</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <p className="text-2xl font-black text-cyan-300">
                  {account?.is_depleted_flag === 1 ? 'Depleted' : 'Ready'}
                </p>
                <p className="text-xs uppercase tracking-[1px] text-slate-300">Credit State</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 truncate">
              Account: <span className="text-white font-medium">{account?.customer_email || 'mirajhadish48@gmail.com'}</span>
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-white/10">
        <form onSubmit={handleQuickSearch} className="flex gap-2">
          <input
            type="text"
            value={quickDomain}
            onChange={(e) => setQuickDomain(e.target.value)}
            placeholder="Quick domain lookup..."
            className="w-full px-3 py-1.5 rounded-lg bg-black/30 border border-white/15 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="glass-button-active px-3 py-1.5 rounded-lg text-xs font-semibold text-white whitespace-nowrap"
          >
            Lookup
          </button>
        </form>
      </div>
    </article>
  );
};

export default DomainsStatsCard;
