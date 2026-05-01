import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import PropTypes from 'prop-types';
import { experiences } from '../constants';
import { SectionWrapper } from '../hoc';
import { download, downloadHover, resume } from '../assets';
import { textVariant } from '../utils/motion';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: 'rgba(15, 23, 42, 0.58)',
      color: '#f8fafc',
      border: '1px solid rgba(255, 255, 255, 0.16)',
      backdropFilter: 'blur(18px)',
      boxShadow:
        'rgba(2, 6, 23, 0.28) 0px 24px 70px',
    }}
    contentArrowStyle={{
      borderRight: '7px solid  #232631',
    }}
    date={
      <div>
        <h3 className="text-light text-[18px] font-bold font-beckman">
          {experience.date}
        </h3>
      </div>
    }
    iconStyle={{ background: experience.iconBg }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }>
    <div>
      <h3 className="text-white text-[24px] font-bold font-beckman tracking-[2px]">
        {experience.title}
      </h3>
      <p
        className="text-taupe text-[22px] font-semibold font-overcameBold tracking-[1px]"
        style={{ margin: 0 }}>
        {experience.company_name}
      </p>
    </div>
  </VerticalTimelineElement>
);
ExperienceCard.propTypes = {
  experience: PropTypes.shape({
    date: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconBg: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} sm:pl-16 pl-[2rem]`}>
          What I&apos;ve done so far
        </p>
        <h2 className={`${styles.sectionHeadText} sm:pl-16 pl-[2rem]`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline className="vertical-timeline-custom-line">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
          <VerticalTimelineElement
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.58)',
              color: '#f8fafc',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(18px)',
              boxShadow:
                'rgba(2, 6, 23, 0.28) 0px 24px 70px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            contentArrowStyle={{
              borderRight: '7px solid  #232631',
            }}
            iconStyle={{ background: '#333333' }}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                <img
                  src={resume}
                  alt="resume"
                  className="w-[45%] h-[45%] object-contain"
                />
              </div>
            }>
            <motion.button
              className="live-demo flex justify-between 
              sm:text-[18px] text-[14px] text-timberWolf 
              font-bold font-beckman items-center py-5 pl-3 pr-3 
              whitespace-nowrap gap-1 sm:w-[148px] sm:h-[58px] 
              w-[135px] h-[46px] rounded-[10px] glass-button
              sm:mt-[22px] mt-[16px] transition duration-[0.2s] 
              ease-in-out relative overflow-hidden group"
              onClick={() => {
                window.open(
                  'https://drive.google.com/file/d/1VH-Zb5P4hnfuQw596fImcDI0ALLw6win/view?usp=sharing',
                  '_blank'
                );
              }}
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 0 25px rgba(0, 255, 150, 0.6), 0 0 40px rgba(0, 150, 255, 0.4)'
              }}
              whileTap={{ 
                scale: 0.95,
                boxShadow: '0 0 15px rgba(0, 255, 150, 0.4)'
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15
              }}>
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 rounded-[10px]"
                animate={{ 
                  backgroundPosition: ['0% center', '100% center', '0% center']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              
              <motion.div
                className="flex items-center gap-2 relative z-10"
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20
                }}
              >
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                >
                  MY RESUME
                </motion.span>
                
                <motion.img
                  src={download}
                  alt="download"
                  className="download-btn sm:w-[26px] sm:h-[26px] 
                  w-[23px] h-[23px] object-contain"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2
                  }}
                  whileTap={{
                    rotate: 180,
                    scale: 0.9
                  }}
                  transition={{ 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 200
                  }}
                />
              </motion.div>

              {/* Pulse effect on hover */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0 rounded-[10px]"
                animate={{ opacity: 0 }}
                whileHover={{ 
                  opacity: [0, 0.1, 0],
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

const WrappedExperience = SectionWrapper(Experience, 'work');
export default WrappedExperience;
