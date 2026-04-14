import { motion } from 'framer-motion';
import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology) => (
          <motion.div
            className="w-28 h-28 flex items-center justify-center relative group cursor-pointer"
            key={technology.name}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
              {technology.name}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>

            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

            {/* Icon container */}
            <div className="relative z-10 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/30 transition-all duration-300">
              {technology.icon.startsWith('http') ? (
                <motion.img
                  src={technology.icon}
                  alt={technology.name}
                  className="w-16 h-16 object-contain filter group-hover:brightness-110 group-hover:drop-shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <div className="w-16 h-16 group-hover:drop-shadow-2xl transition-all duration-300">
                  <BallCanvas icon={technology.icon} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, '');
