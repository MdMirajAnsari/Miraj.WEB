import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

interface GitHubRepo {
  id: number;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'MdMirajAnsari';

const clampMetric = (value: number, max: number) => Math.max(8, Math.min(100, (value / Math.max(max, 1)) * 100));

const getRadarPoint = (index: number, value: number, total: number) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const radius = 32 + value * 0.58;

  return `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
};

const GitHubSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
    {[0, 1, 2].map((item) => (
      <div key={item} className="glass-card rounded-[16px] p-5 animate-pulse">
        <div className="h-5 w-2/3 rounded bg-white/20" />
        <div className="mt-5 h-3 w-full rounded bg-white/10" />
        <div className="mt-3 h-3 w-4/5 rounded bg-white/10" />
        <div className="mt-6 h-8 w-24 rounded bg-white/10" />
      </div>
    ))}
  </div>
);

const GitHubActivity = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=pushed&per_page=6`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('GitHub activity is temporarily unavailable.');
        }

        return response.json();
      })
      .then((data: GitHubRepo[]) => {
        setRepos(Array.isArray(data) ? data : []);
        setError('');
      })
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'GitHub activity is temporarily unavailable.');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const totals = useMemo(
    () =>
      repos.reduce(
        (summary, repo) => ({
          stars: summary.stars + repo.stargazers_count,
          forks: summary.forks + repo.forks_count,
          languages: repo.language ? new Set([...summary.languages, repo.language]) : summary.languages,
        }),
        { stars: 0, forks: 0, languages: new Set<string>() },
      ),
    [repos],
  );

  const languageBars = useMemo(() => {
    const counts = repos.reduce<Record<string, number>>((accumulator, repo) => {
      const language = repo.language || 'Other';
      accumulator[language] = (accumulator[language] || 0) + 1;
      return accumulator;
    }, {});
    const maxCount = Math.max(...Object.values(counts), 1);

    return Object.entries(counts)
      .map(([language, count]) => ({
        language,
        count,
        width: clampMetric(count, maxCount),
      }))
      .sort((first, second) => second.count - first.count);
  }, [repos]);

  const radarMetrics = useMemo(() => {
    const now = Date.now();
    const recentUpdates = repos.filter((repo) => now - new Date(repo.pushed_at).getTime() < 1000 * 60 * 60 * 24 * 120).length;
    const metrics = [
      { label: 'Repos', value: clampMetric(repos.length, 6) },
      { label: 'Stars', value: clampMetric(totals.stars, Math.max(totals.stars, 8)) },
      { label: 'Forks', value: clampMetric(totals.forks, Math.max(totals.forks, 6)) },
      { label: 'Languages', value: clampMetric(totals.languages.size, 6) },
      { label: 'Recent', value: clampMetric(recentUpdates, 6) },
    ];

    return metrics;
  }, [repos, totals]);

  const radarPolygon = radarMetrics.map((metric, index) => getRadarPoint(index, metric.value, radarMetrics.length)).join(' ');

  return (
    <div>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Open Source Pulse</p>
        <h2 className={`${styles.sectionHeadTextLight}`}>GitHub Activity.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]"
      >
        Recent public repositories and updates from my GitHub profile.
      </motion.p>

      {loading && <GitHubSkeleton />}

      {!loading && error && (
        <div className="mt-10 glass-card rounded-[16px] p-6 text-taupe">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-[14px] p-5">
              <p className="text-sm uppercase tracking-[2px] text-blue-200">Recent repos</p>
              <strong className="mt-2 block text-3xl text-white">{repos.length}</strong>
            </div>
            <div className="glass-card rounded-[14px] p-5">
              <p className="text-sm uppercase tracking-[2px] text-blue-200">Stars / Forks</p>
              <strong className="mt-2 block text-3xl text-white">{totals.stars} / {totals.forks}</strong>
            </div>
            <div className="glass-card rounded-[14px] p-5">
              <p className="text-sm uppercase tracking-[2px] text-blue-200">Languages</p>
              <strong className="mt-2 block text-3xl text-white">{totals.languages.size}</strong>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5">
            <motion.section
              variants={fadeIn('up', 'spring', 0.08, 0.75)}
              className="glass-card rounded-[16px] p-5 sm:p-6"
            >
              <h3 className="text-white text-xl font-semibold">Language Distribution</h3>
              <div className="mt-6 space-y-5">
                {languageBars.map((bar) => (
                  <div key={bar.language}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="text-gray-200">{bar.language}</span>
                      <span className="text-blue-200">{bar.count}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-300 via-indigo-300 to-fuchsia-300"
                        style={{ width: `${bar.width}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              variants={fadeIn('up', 'spring', 0.14, 0.75)}
              className="glass-card rounded-[16px] p-5 sm:p-6"
            >
              <h3 className="text-white text-xl font-semibold">Activity Radar</h3>
              <div className="mt-4 flex justify-center">
                <svg viewBox="0 0 200 200" className="h-[260px] w-full max-w-[320px]" role="img" aria-label="GitHub activity radar chart">
                  {[35, 58, 82].map((radius) => (
                    <circle key={radius} cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.16)" />
                  ))}
                  {radarMetrics.map((metric, index) => {
                    const outerPoint = getRadarPoint(index, 100, radarMetrics.length);
                    const [x, y] = outerPoint.split(',');
                    return (
                      <g key={metric.label}>
                        <line x1="100" y1="100" x2={x} y2={y} stroke="rgba(255,255,255,0.14)" />
                        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-blue-100 text-[9px] font-semibold">
                          {metric.label}
                        </text>
                      </g>
                    );
                  })}
                  <polygon points={radarPolygon} fill="rgba(129, 140, 248, 0.35)" stroke="#93c5fd" strokeWidth="2" />
                  {radarMetrics.map((metric, index) => {
                    const point = getRadarPoint(index, metric.value, radarMetrics.length);
                    const [x, y] = point.split(',');
                    return <circle key={metric.label} cx={x} cy={y} r="3" fill="#bfdbfe" />;
                  })}
                </svg>
              </div>
            </motion.section>
          </div>
        </>
      )}
    </div>
  );
};

export default SectionWrapper(GitHubActivity, 'github');
