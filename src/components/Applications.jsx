import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

const Applications = ({ setActiveTab }) => {
  return (
    <div className="relative z-0 bg-primary min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}>
          <p className={`${styles.sectionSubText}`}>My Tech Arsenal</p>
          <h2 className={`${styles.sectionHeadTextLight}`}>Applications.</h2>
        </motion.div>

        {/* Toggle Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setActiveTab('gadgets')}
            className="px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 bg-jetLight text-taupe hover:bg-battleGray">
            Gadgets
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className="px-6 py-3 rounded-[10px] font-poppins font-medium text-[16px] transition-all duration-300 bg-french text-timberWolf shadow-lg">
            Applications
          </button>
        </div>

        <div className="w-full flex">
          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
            Essential applications and tools I use for development, design, and
            productivity.
          </motion.p>
        </div>

        {/* Applications Grid */}
        <div className="mt-[50px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Development Tools Card */}
          <motion.div
            variants={fadeIn('up', 'spring', 0.1, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="bg-jetLight p-8 rounded-[20px] shadow-card hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-french rounded-[10px] flex items-center justify-center">
                <span className="text-[24px]">💻</span>
              </div>
              <h3 className="text-timberWolf font-beckman font-bold text-[24px] tracking-[1px]">
                Development Tools
              </h3>
            </div>
            <ul className="space-y-3 text-taupe text-[15px] font-poppins">
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.google.com/chrome/index.html" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Chrome
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.firefox.com/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Firefox
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.torproject.org/download/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Tor
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Node.js
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://visualstudio.microsoft.com/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Visual Studio & Visual Studio Code
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Docker
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.sourcetreeapp.com/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> SourceTree
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://notepad-plus-plus.org/downloads/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Notepad++
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> Java - winget install Oracle.JDK.17
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.win-rar.com/start.html?&L=0" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> WinRAR
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> PuTTY
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://learn.microsoft.com/en-us/windows/powertoys/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> PowerToys
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Database Tools Card */}
          <motion.div
            variants={fadeIn('up', 'spring', 0.2, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="bg-jetLight p-8 rounded-[20px] shadow-card hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-french rounded-[10px] flex items-center justify-center">
                <span className="text-[24px]">🗄️</span>
              </div>
              <h3 className="text-timberWolf font-beckman font-bold text-[24px] tracking-[1px]">
                Database Tools
              </h3>
            </div>
            <ul className="space-y-3 text-taupe text-[15px] font-poppins">
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.microsoft.com/en-in/sql-server/sql-server-downloads" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> SQL Server
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://learn.microsoft.com/en-us/ssms/install/install" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> SQL Server Client
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://marketplace.visualstudio.com/items?itemName=SSIS.MicrosoftDataToolsIntegrationServices" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> SQL Server Integration Services Projects 2022
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.pgadmin.org/download/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> PostgreSQL Client
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> PostgreSQL Server
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.mongodb.com/try/download/compass" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> MongoDB Compass (client)
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.apachefriends.org/download.html" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> XAMPP
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://dev.mysql.com/downloads/workbench/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> MySQL Client (Workbench)
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Productivity & Media Card */}
          <motion.div
            variants={fadeIn('up', 'spring', 0.3, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="bg-jetLight p-8 rounded-[20px] shadow-card hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-french rounded-[10px] flex items-center justify-center">
                <span className="text-[24px]">🎨</span>
              </div>
              <h3 className="text-timberWolf font-beckman font-bold text-[24px] tracking-[1px]">
                Productivity & Media
              </h3>
            </div>
            <ul className="space-y-3 text-taupe text-[15px] font-poppins">
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.wps.com/download/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> WPS Office
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.videolan.org/vlc/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> VLC
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.figma.com/downloads/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Figma
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://discord.com/download" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Discord
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://www.capeditcut.com/#gsc.tab=0" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> CapeCut
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Mac Utilities Card */}
          <motion.div
            variants={fadeIn('up', 'spring', 0.4, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="bg-jetLight p-8 rounded-[20px] shadow-card hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-french rounded-[10px] flex items-center justify-center">
                <span className="text-[24px]">🍎</span>
              </div>
              <h3 className="text-timberWolf font-beckman font-bold text-[24px] tracking-[1px]">
                Mac Utilities
              </h3>
            </div>
            <ul className="space-y-3 text-taupe text-[15px] font-poppins">
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://pilotmoon.com/scrollreverser/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> Scroll Reverser
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> NetSpeedMonitor
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://alt-tab-macos.netlify.app/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> AltTab
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200">
                <a href="https://dockdoor.net/" target="_blank" rel="noopener noreferrer" 
                  className="hover:text-french transition flex items-center gap-2">
                  <span className="text-french">▸</span> DockDoor
                </a>
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> Raycast
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> AlDente
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> Rectangle
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> Transmission
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> CotEditor
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> Welly
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> CopyClip
              </li>
              <li className="hover:translate-x-2 transition-transform duration-200 flex items-center gap-2">
                <span className="text-french">▸</span> BetterDisplay
              </li>
            </ul>
          </motion.div>
        </div>

       
      </div>
    </div>
  );
};

Applications.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default Applications;
