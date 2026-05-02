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
  {
    id: 6,
    title: 'Election Commission of India',
    description: 'Voter information, election updates, forms, and official ECI resources.',
    url: 'https://www.eci.gov.in/',
  },
  {
    id: 7,
    title: 'MF Central',
    description: 'Investor sign-in for mutual fund portfolio and service requests.',
    url: 'https://app.mfcentral.com/investor/signin',
  },
  {
    id: 8,
    title: 'EPFO Member Passbook',
    description: 'View EPF passbook details and member contribution history.',
    url: 'https://passbook.epfindia.gov.in/MemberPassBook/Login',
  },
  {
    id: 9,
    title: 'EPFO Unified Member Portal',
    description: 'Member services for UAN, EPF claims, profile, and account details.',
    url: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
  },
  {
    id: 10,
    title: 'Ministry of Corporate Affairs',
    description: 'Company services, MCA filings, master data, and corporate resources.',
    url: 'https://www.mca.gov.in/content/mca/global/en/home.html',
  },
  {
    id: 11,
    title: 'Sanchar Saathi',
    description: 'Telecom safety services for mobile connections and device reporting.',
    url: 'https://www.sancharsaathi.gov.in/',
  },
  {
    id: 12,
    title: 'ABHA Health ID',
    description: 'Create or manage ABHA health ID under India digital health services.',
    url: 'https://healthid.ndhm.gov.in/',
  },
  {
    id: 13,
    title: 'VTU EDDTS',
    description: 'VTU electronic document delivery and tracking system.',
    url: 'https://eddts.vtu.ac.in/',
  },
  {
    id: 14,
    title: 'Bihar Bhumi',
    description: 'Bihar land records, mutation services, and property information.',
    url: 'https://biharbhumi.bihar.gov.in/Biharbhumi/',
  },
  {
    id: 15,
    title: 'Experian Credit Report',
    description: 'Consumer portal for Experian credit report and verification services.',
    url: 'https://consumer.experian.in/ECV-OLN/view/angular/#/',
  },
  {
    id: 16,
    title: 'PMMVY',
    description: 'Pradhan Mantri Matru Vandana Yojana portal for maternity benefit services.',
    url: 'https://pmmvy.wcd.gov.in/',
  },
];

const Gov = () => {
  return (
    <div className="glass-card mt-12 mb-20 rounded-[30px] p-6">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-slate-300`}>Government Links</p>
        <h2 className={`${styles.sectionHeadTextLight} text-white`}>Gov Resources</h2>
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
            className="glass-card block rounded-[20px] p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 text-[20px] font-beckman font-bold text-white">
              {link.title}
            </div>
            <p className="text-slate-600 text-[15px] leading-[24px] mb-4">
              {link.description}
            </p>
            <span className="text-blue-200 font-bold text-[14px]">Visit site &rarr;</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Gov, 'gov');
