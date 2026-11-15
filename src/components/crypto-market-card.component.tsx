import { useEffect, useState, useCallback } from 'react';
import { fetchCryptoPrices, type CryptoPriceData } from '../utils/freeApis';

const CryptoMarketCard = () => {
  const [coins, setCoins] = useState<CryptoPriceData[]>([]);
  const [defiTvl, setDefiTvl] = useState('$98.4B');
  const [currency, setCurrency] = useState<'usd' | 'inr'>('usd');
  const [loading, setLoading] = useState(true);

  const loadPrices = useCallback(async () => {
    setLoading(true);
    const controller = new AbortController();
    try {
      const data = await fetchCryptoPrices(controller.signal);
      setCoins(data.coins);
      setDefiTvl(data.defiTvl);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrices();
  }, [loadPrices]);

  const formatPrice = (coin: CryptoPriceData) => {
    if (currency === 'usd') {
      return `$${coin.priceUsd.toLocaleString()}`;
    }
    return `₹${coin.priceInr.toLocaleString()}`;
  };

  return (
    <article className="glass-card rounded-lg p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm uppercase tracking-[2px] text-slate-300">Crypto & DeFi Markets</p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Live APIs
            </span>
            <button
              type="button"
              onClick={loadPrices}
              disabled={loading}
              className="text-xs text-slate-400 hover:text-white transition disabled:opacity-40"
              title="Refresh prices"
            >
              🔄
            </button>
          </div>
        </div>

        {/* Currency Switcher & TVL summary */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Currency:</span>
            <button
              type="button"
              onClick={() => setCurrency('usd')}
              className={`px-2 py-0.5 rounded ${
                currency === 'usd' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD
            </button>
            <button
              type="button"
              onClick={() => setCurrency('inr')}
              className={`px-2 py-0.5 rounded ${
                currency === 'inr' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              INR
            </button>
          </div>

          <div className="text-right">
            <span className="text-slate-400">Ethereum DeFi TVL: </span>
            <strong className="text-cyan-300 font-mono">{defiTvl}</strong>
          </div>
        </div>

        {/* Price grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {coins.map((coin) => (
            <div key={coin.id} className="rounded-lg bg-white/10 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase">{coin.symbol}</span>
                <span
                  className={`text-[10px] font-mono font-semibold ${
                    coin.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {coin.change24h >= 0 ? '+' : ''}
                  {coin.change24h}%
                </span>
              </div>
              <p className="text-base sm:text-lg font-black text-white mt-1 font-mono">
                {formatPrice(coin)}
              </p>
              <p className="text-[10px] text-slate-400 truncate">{coin.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <span>Powered by CoinGecko & DefiLlama</span>
        <a
          href="https://www.coingecko.com"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-300 hover:underline"
        >
          Markets ↗
        </a>
      </div>
    </article>
  );
};

export default CryptoMarketCard;
