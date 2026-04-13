import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import { fadeIn, textVariant } from '../utils/motion';

const govLinks = [
  {
    id: 1,
    title: 'Official Government Portal',
    description: 'Access government services, certificates, and public information.',
    url: 'https://www.india.gov.in',
  },
  {
    id: 2,
    title: 'Ministry of Finance',
    description: 'Latest policies, budgets, and financial updates from the government.',
    url: 'https://www.finmin.nic.in',
  },
  {
    id: 3,
    title: 'Income Tax Department',
    description: 'File taxes, check refunds, and access taxpayer services online.',
    url: 'https://www.incometax.gov.in',
  },
  {
    id: 4,
    title: 'Ministry of Home Affairs',
    description: 'Home ministry announcements, e-passport, and security updates.',
    url: 'https://www.mha.gov.in',
  },
  {
    id: 5,
    title: 'Digital India',
    description: 'Initiative for digital services, records, and governance resources.',
    url: 'https://www.digitalindia.gov.in',
  },
];

const Gov = () => {
  return (
    <div className="mt-12 mb-20 bg-slate-100/80 rounded-[30px] p-6 border border-slate-200 shadow-sm">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-slate-500`}>Government Links</p>
        <h2 className={`${styles.sectionHeadTextLight} text-slate-800`}>Gov Resources</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-slate-600 text-[18px] max-w-3xl leading-[30px]">
        Find official government websites and public services in one place. Click any card to open the source link.
      </motion.p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {govLinks.map((link, index) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            variants={fadeIn('up', 'spring', index * 0.15, 0.75)}
            className="block rounded-[20px] border border-slate-200 bg-slate-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-[20px] font-beckman font-bold text-slate-900">
              {link.title}
            </div>
            <p className="text-slate-600 text-[15px] leading-[24px] mb-4">
              {link.description}
            </p>
            <span className="text-slate-700 font-bold text-[14px]">Visit site →</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Gov, 'gov');
