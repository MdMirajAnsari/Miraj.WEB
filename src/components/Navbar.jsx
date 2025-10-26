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
    if (nav.title === 'Blog') {
      // Navigate to Blog page
      navigate('/blog');
      setActive(nav.title);
    } else if (nav.title === 'Gadgets') {
      // Navigate to Gadgets page
      navigate('/gadgets');
      setActive(nav.title);
    } else {
      // Navigate to home page and scroll to section
      navigate('/');
      setActive(nav.title);
      // Small delay to ensure navigation completes before scrolling
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
      className={`${styles.paddingX} w-full flex items-center py-2 fixed 
      top-0 z-20 bg-flashWhite sm:opacity-[0.97] xxs:h-[12vh]`}
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
          <div className="text-[21px] font-medium font-mova tracking-[3px] ml-[0.6rem] text-eerieBlack uppercase">
            Miraj
          </div>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-14 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'text-french' : 'text-eerieBlack'
              } hover:text-taupe text-[21px] font-medium font-mova 
                uppercase tracking-[3px] cursor-pointer nav-links`}
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
              className="p-6 bg-flashWhite opacity-[0.98] fixed 
                top-0 left-0 right-0 w-full h-screen z-50 menu overflow-y-auto"
            >
              <div className="flex justify-end mb-8">
                <img
                  src={close}
                  alt="close"
                  className="w-[28px] h-[28px] object-contain cursor-pointer"
                  onClick={() => setToggle(false)}
                />
              </div>
              <ul
                className="list-none flex flex-col gap-6 
                items-center justify-center mt-[5rem] px-4"
              >
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`${
                      active === nav.title ? 'text-french' : 'text-eerieBlack'
                    } text-[48px] sm:text-[64px] font-bold font-arenq 
                      uppercase tracking-[1px] cursor-pointer hover:text-taupe
                      transition-colors duration-300`}
                    onClick={() => handleNavClick(nav)}
                  >
                    <span>{nav.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <img
              src={menu}
              alt="menu"
              className="w-[34px] h-[34px] object-contain cursor-pointer"
              onClick={() => setToggle(true)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
