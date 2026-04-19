import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { close, menu } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (nav) => {
    if (nav.id === 'blog') {
      navigate('/blog');
      setActive(nav.title);
    } else if (nav.id === 'course') {
      navigate('/course');
      setActive(nav.title);
    } else if (nav.id === 'gadgets') {
      navigate('/gadgets');
      setActive(nav.title);
    } else if (nav.id === 'gallery') {
      navigate('/gallery');
      setActive(nav.title);
    } else if (nav.id === 'youtube') {
      navigate('/youtube');
      setActive(nav.title);
    } else if (nav.id === 'gov') {
      navigate('/gov');
      setActive(nav.title);
    } else {
      navigate('/');
      setActive(nav.title);
      setTimeout(() => {
        const element = document.getElementById(nav.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setToggle(false); // Close the mobile menu if open
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-50 bg-flashWhite/95 backdrop-blur-sm border-b border-white/10 shadow-sm`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px]"
          >
            <title>MinIO</title>
            <path d="M13.2072.006c-.6216-.0478-1.2.1943-1.6211.582a2.15 2.15 0 0 0-.0938 3.0352l3.4082 3.5507a3.042 3.042 0 0 1-.664 4.6875l-.463.2383V7.2853a15.4198 15.4198 0 0 0-8.0174 10.4862v.0176l6.5487-3.3281v7.621L13.7794 24V13.6817l.8965-.4629a4.4432 4.4432 0 0 0 1.2207-7.0292l-3.371-3.5254a.7489.7489 0 0 1 .037-1.0547.7522.7522 0 0 1 1.0567.0371l.4668.4863-.006.0059 4.0704 4.2441a.0566.0566 0 0 0 .082 0 .06.06 0 0 0 0-.0703l-3.1406-5.1425-.1484.1425.1484-.1445C14.4945.3926 13.8287.0538 13.2072.006Zm-.9024 9.8652v2.9941l-4.1523 2.1484a13.9787 13.9787 0 0 1 2.7676-3.9277 14.1784 14.1784 0 0 1 1.3847-1.2148z" />
          </svg>
          {/* <div className="text-[21px] font-medium font-mova tracking-[3px] ml-[0.6rem] text-eerieBlack uppercase">
            Miraj
          </div> */}
        </Link>
        <ul className="list-none hidden sm:flex flex-row flex-wrap gap-4 md:gap-8 lg:gap-12 mt-2 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-french' : 'text-eerieBlack'
              } hover:text-taupe text-[16px] sm:text-[18px] md:text-[20px] font-medium font-mova 
                uppercase tracking-[2px] cursor-pointer nav-links`}
              onClick={() => handleNavClick(nav)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          {toggle ? (
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md p-6 min-h-screen overflow-y-auto animate-in fade-in duration-300"
            >
              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => setToggle(false)}
                  className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center focus:outline-none"
                  aria-label="Close menu"
                >
                  <img
                    src={close}
                    alt="close"
                    className="w-6 h-6 object-contain"
                  />
                </button>
              </div>
              <ul
                className="list-none flex flex-col gap-5 
                items-center justify-center mt-10 px-4"
              >
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`${
                      active === nav.title ? 'text-white' : 'text-white'
                    } text-[32px] sm:text-[40px] font-bold font-arenq 
                      uppercase tracking-[1px] cursor-pointer hover:text-blue-300
                      transition-colors duration-300 text-center drop-shadow-lg`}
                    onClick={() => handleNavClick(nav)}
                  >
                    <span>{nav.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setToggle(true)}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 focus:outline-none"
              aria-label="Open menu"
            >
              <img
                src={menu}
                alt="menu"
                className="w-6 h-6 object-contain"
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
