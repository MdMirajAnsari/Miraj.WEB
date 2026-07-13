import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { integrations, trackUmamiEvent } from '../utils/integrations';

interface PagefindResultData {
  url: string;
  meta?: {
    title?: string;
  };
  excerpt?: string;
}

const PagefindSearchPanel = ({ query }: { query: string }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState<PagefindResultData[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!integrations.pagefind.enabled || query.trim().length < 3) {
      setResults([]);
      return undefined;
    }

    let isMounted = true;

    const runSearch = async () => {
      try {
        const pagefindPath = '/pagefind/pagefind.js';
        const pagefind = await import(/* @vite-ignore */ pagefindPath);
        const search = await pagefind.search(query);
        const data = await Promise.all(
          search.results.slice(0, 5).map((result) => result.data()),
        );

        if (isMounted) {
          setIsAvailable(true);
          setResults(data);
          trackUmamiEvent('pagefind_search', { query, count: data.length });
        }
      } catch {
        if (isMounted) {
          setIsAvailable(false);
          setResults([]);
        }
      }
    };

    runSearch();

    return () => {
      isMounted = false;
    };
  }, [query]);

  if (!isAvailable || results.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-white/10 p-4">
      <p className="mb-3 text-sm uppercase tracking-[2px] text-indigo-200">Pagefind Results</p>
      <div className="space-y-3">
        {results.map((result) => (
          <button
            key={result.url}
            type="button"
            onClick={() => navigate(result.url.replace(window.location.origin, ''))}
            className="block w-full rounded-lg bg-black/20 p-3 text-left transition hover:bg-black/30"
          >
            <span className="block text-sm font-semibold text-white">{result.meta?.title || result.url}</span>
            {result.excerpt && (
              <span
                className="mt-1 block text-xs leading-5 text-gray-300"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PagefindSearchPanel;

