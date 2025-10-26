import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { gadgets } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const GadgetCard = ({ id, name, description, image, specs, price, link, index }) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.5, 0.75)}
      className="bg-jetLight p-5 rounded-[20px] w-full sm:w-[300px] 
        shadow-card hover:shadow-xl transition-all duration-300 
        hover:scale-[1.02] cursor-pointer">
      <div className="relative w-full h-[200px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-[10px]"
        />
      </div>

      <div className="mt-5">
        <h3
          className="text-timberWolf font-bold text-[24px] 
          font-beckman tracking-[1px]">
          {name}
        </h3>
        <p
          className="mt-2 text-taupe text-[14px] leading-[22px] 
          font-poppins tracking-[0.5px]">
          {description}
        </p>

        {specs && specs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {specs.map((spec, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-night text-timberWolf 
                  text-[12px] rounded-[5px] font-poppins">
                {spec}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          {price && (
            <div className="text-french font-bold text-[20px] font-beckman">
              {price}
            </div>
          )}
          {link && (
            <button
              onClick={() => window.open(link, '_blank')}
              className="bg-night text-timberWolf px-4 py-2 rounded-[8px] 
                text-[14px] font-poppins hover:bg-battleGray 
                hover:text-eerieBlack transition duration-300 font-medium">
              View Details
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

GadgetCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  specs: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.string,
  link: PropTypes.string,
  index: PropTypes.number.isRequired,
};

const Gadgets = () => {
  return (
    <div className="relative z-0 bg-primary min-h-screen pt-[120px] pb-20">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}>
          <p className={`${styles.sectionSubText}`}>My Tech Arsenal</p>
          <h2 className={`${styles.sectionHeadTextLight}`}>Gadgets.</h2>
        </motion.div>

        <div className="w-full flex">
          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]">
            Here are the gadgets I use daily for development, design, and
            productivity. Each device plays a crucial role in my workflow,
            enabling me to deliver high-quality work efficiently.
          </motion.p>
        </div>

        <div className="mt-[50px] flex flex-wrap justify-center gap-7 sm:justify-start">
          {gadgets.map((gadget, index) => (
            <GadgetCard key={gadget.id} index={index} {...gadget} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gadgets;
