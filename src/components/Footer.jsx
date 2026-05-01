import React from 'react';
import PropTypes from 'prop-types';
import { styles } from '../styles';

const themes = ['dark', 'light', 'glass'];

const Footer = ({ theme, onThemeChange }) => {
  return (
    <footer className={`${styles.paddingX} glass-surface py-8 mt-32 border-t border-white/10 relative z-[60]`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-silver text-sm font-poppins text-center sm:text-left">
            © {new Date().getFullYear()} Miraj. All rights reserved.
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-silver text-sm font-poppins">
            <span>Made with</span>
            <span className="text-red-500 text-lg">❤️</span>
            <span>by Miraj</span>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur-md">
            {themes.map((themeName) => (
              <button
                key={themeName}
                type="button"
                onClick={() => onThemeChange(themeName)}
                aria-pressed={theme === themeName}
                className={`px-3 py-1.5 rounded-full text-[12px] font-poppins font-semibold capitalize transition-all duration-300 ${
                  theme === themeName
                    ? 'bg-[rgba(255,255,255,0.9)] text-slate-950 shadow-sm'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                {themeName}
              </button>
            ))}
          </div>

          {/* Buy me coffee */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.buymeacoffee.com/miraj"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-sm"
            >
              <span>☕</span>
              <span className="hidden sm:inline">Buy me a coffee</span>
              <span className="sm:hidden">Coffee</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light', 'glass']).isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default Footer;
