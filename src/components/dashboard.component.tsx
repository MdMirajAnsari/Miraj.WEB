import { Navigate } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { resetAnalytics } from '../redux/features/analytics/analyticsSlice';
import { useAppDispatch, useAppSelector } from '../redux';

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const MetricCard = ({ title, value, detail }: { title: string; value: number | string; detail: string }) => (
  <article className="glass-card rounded-lg p-5">
    <p className="text-sm uppercase tracking-[2px] text-slate-300">{title}</p>
    <p className="mt-3 text-4xl font-black text-white font-poppins">{value}</p>
    <p className="mt-2 text-sm text-slate-300">{detail}</p>
  </article>
);

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const analytics = useAppSelector((state) => state.analytics);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: { pathname: '/dashboard' } }} />;
  }

  const topPages = [...analytics.pageVisits].sort((first, second) => second.count - first.count).slice(0, 6);
  const topBlogs = [...analytics.blogReads].sort((first, second) => second.count - first.count).slice(0, 5);
  const topVideos = [...analytics.videoWatches].sort((first, second) => second.count - first.count).slice(0, 5);
  const maxPageCount = Math.max(1, ...topPages.map((visit) => visit.count));

  return (
    <main className="min-h-screen pt-[110px] pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[3px] text-cyan-200 font-semibold">Dashboard</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-black text-white font-poppins">
              Visitor Insights
            </h1>
            <p className="mt-3 text-slate-300">Signed in as {user?.displayName || 'Miraj'}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => dispatch(resetAnalytics())}
              className="glass-button rounded-lg px-4 py-3 text-sm text-white"
            >
              Reset analytics
            </button>
            <button
              type="button"
              onClick={() => dispatch(logout())}
              className="glass-button-active rounded-lg px-4 py-3 text-sm text-white"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          <MetricCard title="User Visits" value={analytics.totalVisits} detail={`${analytics.pageVisits.length} unique pages`} />
          <MetricCard title="Blog Reads" value={analytics.totalBlogReads} detail={`${analytics.blogReads.length} unique posts`} />
          <MetricCard title="Video Watches" value={analytics.totalVideoWatches} detail={`${analytics.videoWatches.length} unique videos`} />
          <MetricCard title="Activity Feed" value={analytics.recentActivity.length} detail="Latest tracked actions" />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 mb-6">
          <article className="glass-card rounded-lg p-5 sm:p-6">
            <h2 className="text-xl font-bold text-white mb-5">Page Visits</h2>
            {topPages.length === 0 ? (
              <p className="text-slate-300">No visits tracked yet.</p>
            ) : (
              <div className="space-y-4">
                {topPages.map((visit) => (
                  <div key={visit.path}>
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-white font-semibold">{visit.label}</span>
                      <span className="text-slate-300">{visit.count}</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300"
                        style={{ width: `${(visit.count / maxPageCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="glass-card rounded-lg p-5 sm:p-6">
            <h2 className="text-xl font-bold text-white mb-5">Recent Activity</h2>
            {analytics.recentActivity.length === 0 ? (
              <p className="text-slate-300">Open blogs or mark videos watched to fill this feed.</p>
            ) : (
              <div className="space-y-4">
                {analytics.recentActivity.map((activity) => (
                  <div key={activity.id} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-white font-semibold">{activity.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{activity.meta}</p>
                    <p className="mt-1 text-xs text-slate-400">{formatDate(activity.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <article className="glass-card rounded-lg p-5 sm:p-6">
            <h2 className="text-xl font-bold text-white mb-5">Blogs Read</h2>
            {topBlogs.length === 0 ? (
              <p className="text-slate-300">No blog reads tracked yet.</p>
            ) : (
              <div className="space-y-4">
                {topBlogs.map((blog) => (
                  <div key={blog.id} className="rounded-lg border border-white/10 bg-white/10 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white font-semibold">{blog.title}</p>
                        <p className="mt-1 text-sm text-slate-300">{blog.category} | {blog.readTime} min read</p>
                      </div>
                      <span className="text-cyan-200 font-bold">{blog.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="glass-card rounded-lg p-5 sm:p-6">
            <h2 className="text-xl font-bold text-white mb-5">YouTube Watched</h2>
            {topVideos.length === 0 ? (
              <p className="text-slate-300">Mark a YouTube video watched to track it here.</p>
            ) : (
              <div className="space-y-4">
                {topVideos.map((video) => (
                  <div key={video.id} className="rounded-lg border border-white/10 bg-white/10 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white font-semibold">{video.title}</p>
                        <p className="mt-1 text-sm text-slate-300">{video.category}</p>
                      </div>
                      <span className="text-emerald-200 font-bold">{video.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
