import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthError, login } from '../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, error } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('miraj');
  const [password, setPassword] = useState('');

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/dashboard';

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ username, password }));

    if (username.trim() === 'miraj' && password === '1234') {
      navigate(from, { replace: true });
    }
  };

  return (
    <main className="min-h-screen pt-[110px] pb-12 px-6 flex items-center justify-center">
      <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
        <div className="glass-card rounded-lg p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[520px] overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-indigo-300 to-emerald-300" />
          <div>
            <p className="text-sm uppercase tracking-[3px] text-cyan-200 font-semibold">Private analytics</p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black text-white leading-tight font-poppins">
              Track what visitors explore on your site.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-8 max-w-2xl">
              Sign in to view dashboard insights for page visits, blog reading, and watched YouTube videos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
            {[
              ['Visits', 'Route activity'],
              ['Blogs', 'Read tracking'],
              ['Videos', 'Watch signals'],
            ].map(([title, subtitle]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-bold text-white">{title}</p>
                <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[3px] text-indigo-200 font-semibold">Welcome back</p>
            <h2 className="mt-3 text-3xl font-bold text-white font-poppins">Login</h2>
          </div>

          <label className="block mb-5">
            <span className="block mb-2 text-sm font-semibold text-slate-200">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300"
              placeholder="miraj"
              autoComplete="username"
            />
          </label>

          <label className="block mb-5">
            <span className="block mb-2 text-sm font-semibold text-slate-200">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-300"
              placeholder="1234"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="mb-5 rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="glass-button-active rounded-lg px-5 py-3 text-white font-semibold transition hover:scale-[1.01]"
          >
            Open Dashboard
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
