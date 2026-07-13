import { motion } from "framer-motion";
import { styles } from "../styles";
import PropTypes from "prop-types";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import type { Service } from "../models";

interface ServiceCardProps extends Service {
  index: number;
}

const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="xs:w-[240px] w-full sm:w-[250px] glass-card p-[1px] rounded-[20px]"
    >
      <div
      
        className="rounded-[20px] py-4 px-6 sm:py-5 sm:px-12 min-h-[260px] sm:min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img src={icon} alt={title} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
        <h3 className="text-slate-100 text-[16px] sm:text-[18px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};
ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};


const About = () => {
  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]"
      >
        Full Stack Software Engineer with 4+ years of experience building scalable,
        reliable, and user-focused web applications. Skilled in ASP.NET Core,
        Web API, React, and SQL Server, with strong hands-on experience designing,
        developing, and maintaining modern software solutions. Proven ability to
        deliver high-quality features on time while improving product performance,
        user retention, and business impact.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-6 sm:gap-10 justify-center">
        {(services as Service[]).map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");

