import { useEffect, useMemo, useState } from 'react';
import { githubHeaders, integrations } from '../utils/integrations';

interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
}

const GitHubStatsCard = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${integrations.github.username}/repos?sort=pushed&per_page=30`, {
      signal: controller.signal,
      headers: githubHeaders(),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('GitHub stats are temporarily unavailable');
        }

        const data = await response.json();
        setRepos(Array.isArray(data) ? data : []);
      })
      .catch((fetchError) => {
        if (!(fetchError instanceof DOMException && fetchError.name === 'AbortError')) {
          setError(fetchError instanceof Error ? fetchError.message : 'GitHub stats are temporarily unavailable');
        }
      });

    return () => controller.abort();
  }, []);

  const stats = useMemo(() => {
    const languages = new Set(repos.map((repo) => repo.language).filter(Boolean));

    return {
      repos: repos.length,
      stars: repos.reduce((total, repo) => total + repo.stargazers_count, 0),
      forks: repos.reduce((total, repo) => total + repo.forks_count, 0),
      languages: languages.size,
      latest: repos[0],
    };
  }, [repos]);

  return (
    <article className="glass-card rounded-lg p-5 sm:p-6">
      <p className="text-sm uppercase tracking-[2px] text-slate-300">GitHub API</p>
      {error && <p className="mt-4 text-slate-300">{error}</p>}
      {!error && repos.length === 0 && <p className="mt-4 text-slate-300">Loading GitHub stats...</p>}
      {!error && repos.length > 0 && (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ['Repos', stats.repos],
              ['Stars', stats.stars],
              ['Forks', stats.forks],
              ['Languages', stats.languages],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white/10 p-3">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs uppercase tracking-[1px] text-slate-300">{label}</p>
              </div>
            ))}
          </div>
          {stats.latest && (
            <p className="mt-4 text-sm text-slate-300">
              Latest pushed repo: <span className="text-white">{stats.latest.name}</span>
            </p>
          )}
        </>
      )}
    </article>
  );
};

export default GitHubStatsCard;
