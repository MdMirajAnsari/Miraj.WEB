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

        <motion.div
          variants={fadeIn('', '', 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-[50px] text-timberWolf font-poppins">
          
          <div className="mb-12">
            <h2 className="text-[32px] font-beckman font-bold mb-6 text-french">Applications</h2>
            
            <div className="mb-8">
              <h3 className="text-[24px] font-bold mb-4 text-battleGray">Development Tools</h3>
              <ul className="space-y-2 text-taupe text-[16px]">
                <li>• <a href="https://www.google.com/chrome/index.html" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Chrome</a></li>
                <li>• <a href="https://www.firefox.com/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Firefox</a></li>
                <li>• <a href="https://www.torproject.org/download/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Tor</a></li>
                <li>• <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Node.js</a></li>
                <li>• <a href="https://visualstudio.microsoft.com/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Visual Studio & Visual Studio Code</a></li>
                <li>• <a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Docker</a></li>
                <li>• <a href="https://www.sourcetreeapp.com/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">SourceTree</a></li>
                <li>• <a href="https://notepad-plus-plus.org/downloads/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Notepad++</a></li>
                <li>• Java - winget install Oracle.JDK.17</li>
                <li>• <a href="https://www.win-rar.com/start.html?&L=0" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">winrar</a></li>
                <li>• <a href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">putty</a></li>
                <li>• <a href="https://learn.microsoft.com/en-us/windows/powertoys/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">PowerToys</a></li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[24px] font-bold mb-4 text-battleGray">Database Tools</h3>
              <ul className="space-y-2 text-taupe text-[16px]">
                <li>• <a href="https://www.microsoft.com/en-in/sql-server/sql-server-downloads" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">SQL Server</a></li>
                <li>• <a href="https://learn.microsoft.com/en-us/ssms/install/install" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">SQL Server Client</a></li>
                <li>• <a href="https://marketplace.visualstudio.com/items?itemName=SSIS.MicrosoftDataToolsIntegrationServices" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">SQL Server Integration Services Projects 2022</a></li>
                <li>• <a href="https://www.pgadmin.org/download/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">PostgreSQL Client</a></li>
                <li>• <a href="https://www.enterprisedb.com/downloads/postgres-postgresql-downloads" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">PostgreSQL Server</a></li>
                <li>• <a href="https://www.mongodb.com/try/download/compass" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">MongoDB Compass (client)</a></li>
                <li>• <a href="https://www.apachefriends.org/download.html" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Xamp</a></li>
                <li>• <a href="https://dev.mysql.com/downloads/workbench/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">MySQL Client(Workbench)</a></li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[24px] font-bold mb-4 text-battleGray">Productivity & Media</h3>
              <ul className="space-y-2 text-taupe text-[16px]">
                <li>• <a href="https://www.wps.com/download/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">WPS Office</a></li>
                <li>• <a href="https://www.videolan.org/vlc/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">VLC</a></li>
                <li>• <a href="https://www.figma.com/downloads/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Figma</a></li>
                <li>• <a href="https://discord.com/download" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Discord</a></li>
                <li>• <a href="https://www.capeditcut.com/#gsc.tab=0" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">CapeCut</a></li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[24px] font-bold mb-4 text-battleGray">Mac Utilities</h3>
              <ul className="space-y-2 text-taupe text-[16px]">
                <li>• <a href="https://pilotmoon.com/scrollreverser/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">Scroll Reverser</a></li>
                <li>• NetSpeedMonitor</li>
                <li>• <a href="https://alt-tab-macos.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">AltTab</a></li>
                <li>• <a href="https://dockdoor.net/" target="_blank" rel="noopener noreferrer" className="hover:text-french transition">DockDoor</a></li>
                <li>• Raycast</li>
                <li>• AlDente</li>
                <li>• Rectangle</li>
                <li>• Transmission</li>
                <li>• CotEditor</li>
                <li>• Welly</li>
                <li>• CopyClip</li>
                <li>• BetterDisplay</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-[24px] font-bold mb-4 text-battleGray">SKILLS</h3>
              <ul className="space-y-2 text-taupe text-[16px]">
                <li>• <span className="font-semibold text-timberWolf">Development Skills:</span> ASP.NET, ASP.NET CORE, Web API, ASP.NET MVC, C#, LINQ, Entity Framework</li>
                <li>• <span className="font-semibold text-timberWolf">Database:</span> SQL Server</li>
                <li>• <span className="font-semibold text-timberWolf">Architecture:</span> Microservice</li>
                <li>• <span className="font-semibold text-timberWolf">Frontend:</span> Angular, React, Javascript, HTML, CSS, Bootstrap, jQuery</li>
                <li>• <span className="font-semibold text-timberWolf">Cloud:</span> Azure</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

Applications.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
};

export default Applications;
