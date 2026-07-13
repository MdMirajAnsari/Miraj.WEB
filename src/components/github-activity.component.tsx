import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';
import LazyImage from './lazy-image.component';
import { githubHeaders, integrations } from '../utils/integrations';

interface GitHubUser {
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  location: string | null;
  name: string | null;
  login: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  pushed_at: string;
  archived: boolean;
  topics?: string[];
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    commits?: Array<{ message: string; sha: string }>;
  };
}

const githubUsername = integrations.github.username;
const dayInMs = 1000 * 60 * 60 * 24;

const clampMetric = (value: number, max: number) => Math.max(8, Math.min(100, (value / Math.max(max, 1)) * 100));

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(date));

const getFreshness = (repo: GitHubRepo) => {
  if (repo.archived) return { label: 'Archived', className: 'bg-gray-500/30 text-gray-100' };

  const daysSincePush = Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / dayInMs);

  if (daysSincePush <= 30) return { label: 'Active', className: 'bg-emerald-500/30 text-emerald-100' };
  if (daysSincePush <= 180) return { label: 'Maintained', className: 'bg-blue-500/30 text-blue-100' };
  return { label: 'Quiet', className: 'bg-amber-500/30 text-amber-100' };
};

const getRadarPoint = (index: number, value: number, total: number) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const radius = 32 + value * 0.58;

  return `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
};

const GitHubSkeleton = () => (
  <div className="mt-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5">
    {[0, 1, 2, 3].map((item) => (
      <div key={item} className="glass-card rounded-[16px] p-5 animate-pulse">
        <div className="h-5 w-2/3 rounded bg-white/20" />
        <div className="mt-5 h-3 w-full rounded bg-white/10" />
        <div className="mt-3 h-3 w-4/5 rounded bg-white/10" />
        <div className="mt-6 h-24 rounded bg-white/10" />
      </div>
    ))}
  </div>
);

const GitHubActivity = () => {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const headers = githubHeaders();

    Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`, { signal: controller.signal, headers }),
      fetch(`https://api.github.com/users/${githubUsername}/repos?sort=pushed&per_page=12`, { signal: controller.signal, headers }),
      fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=60`, { signal: controller.signal, headers }),
    ])
      .then(async ([profileResponse, reposResponse, eventsResponse]) => {
        if (!profileResponse.ok || !reposResponse.ok || !eventsResponse.ok) {
          throw new Error('GitHub activity is temporarily unavailable.');
        }

        const [profileData, reposData, eventsData] = await Promise.all([
          profileResponse.json(),
          reposResponse.json(),
          eventsResponse.json(),
        ]);

        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
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
          watchers: summary.watchers + repo.watchers_count,
          languages: repo.language ? new Set([...summary.languages, repo.language]) : summary.languages,
        }),
        { stars: 0, forks: 0, watchers: 0, languages: new Set<string>() },
      ),
    [repos],
  );

  const highlightedRepos = useMemo(
    () =>
      [...repos]
        .sort((firstRepo, secondRepo) => {
          const firstScore = firstRepo.stargazers_count * 3 + firstRepo.forks_count * 2 + new Date(firstRepo.pushed_at).getTime() / dayInMs;
          const secondScore = secondRepo.stargazers_count * 3 + secondRepo.forks_count * 2 + new Date(secondRepo.pushed_at).getTime() / dayInMs;
          return secondScore - firstScore;
        })
        .slice(0, 4),
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
      .sort((first, second) => second.count - first.count)
      .slice(0, 6);
  }, [repos]);

  const recentCommits = useMemo(
    () =>
      events
        .filter((event) => event.type === 'PushEvent' && event.payload?.commits?.length)
        .flatMap((event) =>
          (event.payload?.commits || []).slice(0, 2).map((commit) => ({
            id: `${event.id}-${commit.sha}`,
            repo: event.repo.name.replace(`${githubUsername}/`, ''),
            message: commit.message.split('\n')[0],
            date: event.created_at,
          })),
        )
        .slice(0, 6),
    [events],
  );

  const heatmapDays = useMemo(() => {
    const countsByDate = events.reduce<Record<string, number>>((counts, event) => {
      const dateKey = new Date(event.created_at).toISOString().slice(0, 10);
      counts[dateKey] = (counts[dateKey] || 0) + 1;
      return counts;
    }, {});
    const maxCount = Math.max(...Object.values(countsByDate), 1);

    return Array.from({ length: 35 }, (_, index) => {
      const date = new Date(Date.now() - (34 - index) * dayInMs);
      const dateKey = date.toISOString().slice(0, 10);
      const count = countsByDate[dateKey] || 0;

      return {
        date: dateKey,
        count,
        opacity: count ? 0.22 + (count / maxCount) * 0.78 : 0.12,
      };
    });
  }, [events]);

  const radarMetrics = useMemo(() => {
    const recentUpdates = repos.filter((repo) => Date.now() - new Date(repo.pushed_at).getTime() < dayInMs * 120).length;
    const pushEvents = events.filter((event) => event.type === 'PushEvent').length;

    return [
      { label: 'Repos', value: clampMetric(repos.length, 12) },
      { label: 'Stars', value: clampMetric(totals.stars, Math.max(totals.stars, 8)) },
      { label: 'Forks', value: clampMetric(totals.forks, Math.max(totals.forks, 6)) },
      { label: 'Commits', value: clampMetric(pushEvents, Math.max(pushEvents, 10)) },
      { label: 'Recent', value: clampMetric(recentUpdates, 12) },
      { label: 'Langs', value: clampMetric(totals.languages.size, 8) },
    ];
  }, [events, repos, totals]);

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
        Live profile signals, repository health, commits, and language usage from my public GitHub activity.
      </motion.p>

      {loading && <GitHubSkeleton />}

      {!loading && error && (
        <div className="mt-10 glass-card rounded-[16px] p-6 text-taupe">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5">
            <motion.section variants={fadeIn('up', 'spring', 0.04, 0.75)} className="glass-card rounded-[16px] p-5 sm:p-6">
              <div className="flex items-center gap-4">
                {profile?.avatar_url && (
                  <LazyImage
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="h-20 w-20 rounded-full object-cover"
                    skeletonClassName="h-20 w-20 rounded-full"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="text-2xl font-semibold text-white">{profile?.name || profile?.login}</h3>
                  <p className="mt-1 text-sm text-blue-200">@{profile?.login}</p>
                  {profile?.location && <p className="mt-1 text-sm text-gray-300">{profile.location}</p>}
                </div>
              </div>
              {profile?.bio && <p className="mt-5 text-gray-300 leading-7">{profile.bio}</p>}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  ['Repos', profile?.public_repos || repos.length],
                  ['Followers', profile?.followers || 0],
                  ['Following', profile?.following || 0],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[12px] bg-white/10 p-3 text-center">
                    <strong className="block text-2xl text-white">{value}</strong>
                    <span className="text-xs uppercase tracking-[1px] text-blue-100">{label}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeIn('up', 'spring', 0.08, 0.75)} className="glass-card rounded-[16px] p-5 sm:p-6">
              <h3 className="text-white text-xl font-semibold">Contribution Rhythm</h3>
              <div className="mt-5 grid grid-cols-7 gap-2">
                {heatmapDays.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} public events`}
                    className="aspect-square rounded-[5px] border border-white/10 bg-emerald-300"
                    style={{ opacity: day.opacity }}
                  />
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ['Stars', totals.stars],
                  ['Forks', totals.forks],
                  ['Watchers', totals.watchers],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[12px] bg-white/10 p-3">
                    <strong className="block text-2xl text-white">{value}</strong>
                    <span className="text-xs uppercase tracking-[1px] text-blue-100">{label}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5">
            <motion.section variants={fadeIn('up', 'spring', 0.12, 0.75)} className="glass-card rounded-[16px] p-5 sm:p-6">
              <h3 className="text-white text-xl font-semibold">Highlighted Repositories</h3>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlightedRepos.map((repo) => {
                  const freshness = getFreshness(repo);

                  return (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[14px] border border-white/10 bg-white/10 p-4 transition hover:border-blue-200/50 hover:bg-white/15"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-white font-semibold break-words">{repo.name}</h4>
                        <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] ${freshness.className}`}>
                          {freshness.label}
                        </span>
                      </div>
                      <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-300 line-clamp-2">
                        {repo.description || 'Public repository'}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-300">
                        {repo.language && <span>{repo.language}</span>}
                        <span>{repo.stargazers_count} stars</span>
                        <span>{repo.forks_count} forks</span>
                        <span>Updated {formatDate(repo.pushed_at)}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.section>

            <motion.section variants={fadeIn('up', 'spring', 0.16, 0.75)} className="glass-card rounded-[16px] p-5 sm:p-6">
              <h3 className="text-white text-xl font-semibold">Recent Commits</h3>
              <div className="mt-5 space-y-4">
                {recentCommits.length === 0 && <p className="text-gray-300">No recent public commits available.</p>}
                {recentCommits.map((commit) => (
                  <div key={commit.id} className="rounded-[12px] bg-white/10 p-4">
                    <p className="text-white text-sm leading-6 line-clamp-2">{commit.message}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-blue-100">
                      <span>{commit.repo}</span>
                      <span>{formatDate(commit.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5">
            <motion.section variants={fadeIn('up', 'spring', 0.2, 0.75)} className="glass-card rounded-[16px] p-5 sm:p-6">
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

            <motion.section variants={fadeIn('up', 'spring', 0.24, 0.75)} className="glass-card rounded-[16px] p-5 sm:p-6">
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

