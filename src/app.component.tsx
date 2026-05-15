import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Projects,
  GitHubActivity,
  Gadgets,
  Gov,
  Gallery,
  YouTube,
  Course,
} from './components';
import Blog from './components/blog.component';
import BlogDetail from './components/blog-detail.component';
import Footer from './components/footer.component';
import ContentStudio from './components/content-studio.component';
import Dashboard from './components/dashboard.component';
import Login from './components/login.component';
import Seo from './components/seo.component';
import PropTypes from 'prop-types';
import type { Theme, ThemeProps } from './models';
import { notifySiteVisit } from './utils/emailNotifications';
import { useAppDispatch } from './redux';
import { recordPageVisit } from './redux/features/analytics/analyticsSlice';

const HomePage = ({ theme, onThemeChange }: ThemeProps) => (
  <>
    <div>
      <Hero />
    </div>

    <div className="bg-about bg-cover bg-center bg-no-repeat">
      <About />
    </div>

    <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
      <Tech />
    </div>

    <Projects />

    <GitHubActivity />

    <div
      className="bg-experience bg-cover bg-center bg-no-repeat
        rounded-tl-[150px] rounded-br-[150px]">
      <div
        className="bg-experienceLight bg-cover bg-center
        bg-no-repeat rounded-tl-[150px] rounded-br-[130px]">
        <Experience />
      </div>
    </div>
    <div className="relative z-0">
      <Contact />
    </div>

    {/* Footer - Only on Home Page */}
    <Footer theme={theme} onThemeChange={onThemeChange} />
  </>
);

HomePage.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light', 'glass']).isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

const getRouteLabel = (path: string) => {
  if (path === '/') return 'Home';
  if (path.startsWith('/blog/')) return 'Blog Detail';

  return path
    .replace('/', '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ') || 'Home';
};

const RouteTracker = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(recordPageVisit({
      path: `${location.pathname}${location.search}`,
      label: getRouteLabel(location.pathname),
    }));
  }, [dispatch, location.pathname, location.search]);

  return null;
};

const App = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'glass';

    const savedTheme = window.localStorage.getItem('theme');

    return ['dark', 'light', 'glass'].includes(savedTheme as Theme) ? (savedTheme as Theme) : 'glass';
  });

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    notifySiteVisit();
  }, []);

  return (
    <BrowserRouter>
      <Seo />
      <RouteTracker />
      <div
        className={`theme-${theme} ${
          theme === 'glass' ? 'glass-theme' : ''
        } relative z-0 min-h-screen`}
      >
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<HomePage theme={theme} onThemeChange={setTheme} />}
          />
          <Route path="/course" element={<Course />} />
          <Route path="/gadgets" element={<Gadgets />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/gov" element={<Gov />} />
          <Route path="/content-studio" element={<ContentStudio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
