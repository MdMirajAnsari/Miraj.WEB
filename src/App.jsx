import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Projects,
  Gadgets,
  Gov,
  Gallery,
  YouTube,
  Course,
} from './components';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Footer from './components/Footer';
import PropTypes from 'prop-types';

const HomePage = ({ theme, onThemeChange }) => (
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

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'glass';

    const savedTheme = window.localStorage.getItem('theme');

    return ['dark', 'light', 'glass'].includes(savedTheme) ? savedTheme : 'glass';
  });

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
