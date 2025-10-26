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
} from './components';
import Blog from './components/Blog';

const HomePage = () => (
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
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gadgets" element={<Gadgets />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
