import React from 'react';
import { styles } from '../styles';

const Footer = () => {
  return (
    <footer className={`${styles.paddingX} py-8 mt-32 bg-gradient-to-r from-blue-900 to-purple-900 border-t border-gray-800 relative z-[60]`}>
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

          {/* Buy me coffee */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.buymeacoffee.com/miraj"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors duration-300 flex items-center gap-2 text-sm"
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

export default Footer;