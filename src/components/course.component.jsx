import { useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';

const CourseHero = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, threshold: 0.2 }}
          className="flex flex-col items-center justify-center text-center gap-4 py-20"
        >
          <motion.h1
            variants={textVariant()}
            className={`${styles.sectionHeadTextLight} leading-[2]`}
          >
            Master Full-Stack <br />
            Web Development
          </motion.h1>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="text-gray-300 text-xl max-w-3xl leading-relaxed"
          >
            Join the most comprehensive live cohort and learn React, Node.js, Next.js, 
            Docker, AWS, AI and more from industry experts
          </motion.p>

          <motion.div
            variants={fadeIn('', '', 0.2, 1)}
            className="flex flex-col sm:flex-row gap-6 mt-8 items-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
              hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-bold 
              text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Enroll Now
            </button>
            <button className="px-8 py-4 border-2 border-purple-600 text-purple-400 
              hover:bg-purple-600/10 rounded-lg font-bold text-lg 
              transition-all duration-300">
              Download Curriculum
            </button>
          </motion.div>

          <motion.p
            variants={fadeIn('', '', 0.3, 1)}
            className="text-purple-400 text-lg font-semibold mt-6"
          >
            🎉 Use code MIRAJ10 for 10% OFF
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeIn('', '', 0.4, 1)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 w-full"
          >
            {[
              { label: 'Hours of Content', value: '200+' },
              { label: 'Industry Projects', value: '50+' },
              { label: 'Community Support', value: '24/7' },
              { label: 'Practical Learning', value: '100%' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'spring', 0.5 + index * 0.1, 0.75)}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                  from-blue-400 to-purple-400 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const WhyChoose = () => {
  const reasons = [
    {
      icon: '🎥',
      title: 'Live Interactive Sessions',
      desc: 'Attend live classes every weekend with real-time doubt solving and interactive discussions',
    },
    {
      icon: '👨‍🏫',
      title: 'Industry Expert Mentors',
      desc: 'Learn from mentors, who have trained thousands of developers',
    },
    {
      icon: '💻',
      title: 'Hands-on Projects',
      desc: 'Build 50+ real-world projects including full-stack applications, APIs, and deployments',
    },
    {
      icon: '🚀',
      title: 'Career Support',
      desc: 'Get resume reviews, interview preparation, and job referrals to kickstart your career',
    },
    {
      icon: '♾️',
      title: 'Lifetime Access',
      desc: 'Get lifetime access to all recordings, resources, and future updates to the curriculum',
    },
    {
      icon: '🤝',
      title: 'Community Network',
      desc: 'Join an active community of developers, collaborate on projects, and grow together',
    },
  ];

  return (
    <div className={`w-full bg-slate-900 ${styles.padding}`}>
      <div className={`${styles.innerWidth} max-w-7xl mx-auto`}>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, threshold: 0.2 }}
          className="flex flex-col"
        >
          <motion.h2
            variants={textVariant()}
            className={`${styles.sectionHeadTextLight} text-center mb-16`}
          >
            Why Choose This Cohort?
          </motion.h2>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="text-gray-400 text-center text-lg mb-12"
          >
            Everything you need to become a professional full-stack developer
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'spring', 0.5 + index * 0.1, 0.75)}
                className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 
                  border border-purple-500/20 rounded-2xl p-8 
                  hover:border-purple-500/40 hover:bg-slate-800/70 
                  transition-all duration-300 backdrop-blur-sm group hover:scale-105"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {reason.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CurriculumPhase = ({ phase, title, topics, index }) => {
  const [expanded, setExpanded] = useState(index === 0);

  const colors = [
    'from-blue-600 to-blue-400',
    'from-purple-600 to-purple-400',
    'from-pink-600 to-pink-400',
    'from-cyan-600 to-cyan-400',
    'from-green-600 to-green-400',
    'from-orange-600 to-orange-400',
  ];

  return (
    <motion.div
      variants={fadeIn('up', 'spring', 0.5 + index * 0.1, 0.75)}
      className="w-full"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full bg-gradient-to-r ${colors[index]} 
          text-white font-bold py-6 px-8 rounded-xl flex items-center justify-between
          hover:shadow-lg transition-all duration-300 text-lg group`}
      >
        <span className="flex items-center gap-4">
          <span className="text-2xl font-black">{phase}</span>
          <span>{title}</span>
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-slate-800/50 border-x border-b border-purple-500/20 rounded-b-xl"
      >
        <div className="p-8">
          {topics.map((topic, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn('left', 'spring', idx * 0.05, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              className="mb-6 last:mb-0"
            >
              <h4 className="text-white font-bold text-base mb-3">
                {idx + 1}. {topic.title}
              </h4>
              <ul className="space-y-2 ml-4">
                {topic.points.map((point, pidx) => (
                  <li key={pidx} className="text-gray-300 flex items-start gap-3">
                    <span className="text-purple-400 mt-1">●</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Curriculum = () => {
  const phases = [
    {
      phase: 'Phase 0',
      title: 'Web Warriors ⚔️',
      topics: [
        {
          title: 'How the Internet Works',
          points: [
            'Introduction to the concept of the Internet',
            'Overview of the World Wide Web (WWW) and its connection to the internet',
            'How data is transferred across networks',
            'Understanding IP addresses, domain names, and routing',
            'Key Concepts: Internet Service Providers (ISPs), Routers, DNS',
          ],
        },
        {
          title: 'DNS Magic and Internals',
          points: [
            'What is DNS (Domain Name System)?',
            'How DNS resolves domain names to IP addresses',
            'Types of DNS records: A, CNAME, MX, and more',
            'DNS Hierarchy: Root DNS servers, TLDs, and authoritative DNS servers',
            'How browsers query DNS servers to load websites',
            'Key Concepts: Recursive queries, Caching, TTL (Time-to-Live)',
          ],
        },
        {
          title: 'Server-Client Architecture',
          points: [
            'What is a Client-Server model?',
            'Differences between Client and Server in web applications',
            'HTTP request-response cycle',
            'How browsers act as clients that request resources from web servers',
            'Introduction to web servers and web hosting',
            'Key Concepts: Web servers (Apache, Nginx), Client-side vs Server-side',
          ],
        },
        {
          title: 'Internet Protocols',
          points: [
            'Introduction to network protocols: What are they, and why are they needed?',
            'The role of protocols in ensuring data transfer integrity and reliability',
            'Overview of key protocols: HTTP, HTTPS, FTP, and SMTP',
            'How secure protocols like HTTPS ensure encrypted communication',
            'Key Concepts: Protocol stacks, Handshakes, Encryption',
          ],
        },
        {
          title: 'TCP/IP',
          points: [
            'What is TCP/IP and why it is fundamental for data transmission',
            'How TCP ensures reliable data transfer via packet acknowledgment',
            'The role of IP in addressing and routing data packets across networks',
            'Understanding ports and sockets in TCP/IP communication',
            'Key Concepts: Three-way handshake, Packet loss, Routing tables',
          ],
        },
        {
          title: 'UDP & HTTP/HTTPS Protocols',
          points: [
            'What is UDP, and how does it differ from TCP?',
            'Understanding when and why UDP is used (e.g., in video streaming or gaming)',
            'Introduction to HTTP and HTTPS protocols',
            'Understanding HTTP request-response cycle and status codes',
            'SSL/TLS and how it secures data during transmission',
          ],
        },
      ],
    },
  ];

  return (
    <div className={`w-full bg-gradient-to-b from-slate-900 to-slate-800 ${styles.padding}`}>
      <div className={`${styles.innerWidth} max-w-7xl mx-auto`}>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, threshold: 0.2 }}
          className="flex flex-col"
        >
          <motion.h2
            variants={textVariant()}
            className={`${styles.sectionHeadTextLight} text-center mb-4`}
          >
            Complete Curriculum
          </motion.h2>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="text-gray-400 text-center text-lg mb-16"
          >
            6 comprehensive phases covering everything from fundamentals to advanced deployment and AI
          </motion.p>

          <div className="space-y-4">
            {phases.map((phase, index) => (
              <CurriculumPhase
                key={index}
                phase={phase.phase}
                title={phase.title}
                topics={phase.topics}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StudentSuccess = () => {
  const testimonials = [
    {
      quote: 'This cohort transformed my career. The hands-on approach and expert mentorship helped me land my dream job!',
      author: 'Jhon Doe',
      position: 'Software Engineer at Google',
      image: '👨‍💼',
    },
    {
      quote: 'Best investment I made in my career. The curriculum is comprehensive and the community support is amazing.',
      author: 'Jane Smith',
      position: 'Full-Stack Developer at Amazon',
      image: '👩‍💼',
    },
    {
      quote: "From zero to hero in 6 months! The projects and real-world scenarios prepared me for the industry.",
      author: 'Alex Johnson',
      position: 'Frontend Developer at Microsoft',
      image: '👨‍💻',
    },
  ];

  return (
    <div className={`w-full bg-slate-900 ${styles.padding}`}>
      <div className={`${styles.innerWidth} max-w-7xl mx-auto`}>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, threshold: 0.2 }}
          className="flex flex-col"
        >
          <motion.h2
            variants={textVariant()}
            className={`${styles.sectionHeadTextLight} text-center mb-16`}
          >
            Student Success Stories
          </motion.h2>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="text-gray-400 text-center text-lg mb-12"
          >
            Join thousands of successful developers who started their journey with us
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'spring', 0.5 + index * 0.1, 0.75)}
                className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 
                  border border-purple-500/20 rounded-2xl p-8 
                  hover:border-purple-500/40 hover:bg-slate-800/70 
                  transition-all duration-300 backdrop-blur-sm group hover:scale-105
                  flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <div className="text-5xl mb-6">
                    {testimonial.image}
                  </div>
                  <p className="text-gray-300 italic leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="border-t border-purple-500/20 pt-6">
                  <p className="text-white font-bold text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-purple-400 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CTA = () => {
  return (
    <div className={`w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 ${styles.padding}`}>
      <div className={`${styles.innerWidth} max-w-7xl mx-auto`}>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, threshold: 0.2 }}
          className="flex flex-col items-center justify-center text-center gap-8"
        >
          <motion.h2
            variants={textVariant()}
            className={`${styles.sectionHeadTextLight}`}
          >
            Ready to Start Your Journey?
          </motion.h2>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="text-gray-300 text-lg max-w-2xl"
          >
            Join Web Dev Cohort 1.0 today and transform your career in just 6 months. 
            Limited seats available!
          </motion.p>

          <motion.div
            variants={fadeIn('', '', 0.2, 1)}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
              hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-bold 
              text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Enroll Now
            </button>
            <p className="text-purple-400 text-lg font-semibold">
              🎉 Use code MIRAJ10 for 10% OFF
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn('', '', 0.3, 1)}
            className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 mt-4"
          >
            <p className="text-gray-300">
              <span className="font-bold text-white">Classes start:</span> January 11, 2025 • 
              <span className="font-bold text-white"> Every Sat & Sun</span> • 
              <span className="font-bold text-purple-400"> 8-10 PM IST</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: 'Is this course conducted live or through pre-recorded sessions?',
      answer: 'This course is conducted live with real-time interaction.',
    },
    {
      question: 'Who will be teaching this course?',
      answer: 'Industry experts mentors will be teaching this course.',
    },
    {
      question: 'Will recordings be available if I miss a class?',
      answer: 'Yes, lifetime access to all recordings is included with your enrollment.',
    },
    {
      question: 'What is the total duration of the course?',
      answer: 'The course is 6 months long with live sessions every weekend.',
    },
    {
      question: 'What is the course language?',
      answer: 'The course is taught in English.',
    },
    {
      question: 'Will there be assignments included in the course?',
      answer: 'Yes, regular assignments and 50+ real-world projects are included.',
    },
    {
      question: 'Will this course cover Web3 topics?',
      answer: 'The course covers modern web development including latest technologies.',
    },
    {
      question: 'What are the timings for the classes?',
      answer: 'Classes are held every Saturday and Sunday from 8-10 PM IST.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={`w-full bg-slate-900 ${styles.padding}`}>
      <div className={`${styles.innerWidth} max-w-4xl mx-auto`}>
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, threshold: 0.2 }}
          className="flex flex-col"
        >
          <motion.h2
            variants={textVariant()}
            className={`${styles.sectionHeadTextLight} text-center mb-4`}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            variants={fadeIn('', '', 0.1, 1)}
            className="text-gray-400 text-center text-lg mb-12"
          >
            We are here to help you with any questions you may have. 
            If you don't find what you need, please contact us at miraj.dev@gmail.com
          </motion.p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'spring', 0.5 + index * 0.05, 0.75)}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full bg-gradient-to-r from-slate-800 to-slate-700 
                    hover:from-slate-700 hover:to-slate-600 text-white font-bold py-4 px-6 
                    rounded-lg flex items-center justify-between transition-all duration-300 
                    border border-purple-500/20 hover:border-purple-500/40"
                >
                  <span className="text-left">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg flex-shrink-0"
                  >
                    ▼
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-slate-800/30 border-x border-b border-purple-500/20 rounded-b-lg"
                >
                  <p className="text-gray-300 p-6">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Course = () => {
  return (
    <div className="relative z-0 bg-slate-900">
      <CourseHero />
      <WhyChoose />
      <Curriculum />
      <StudentSuccess />
      <CTA />
      <FAQ />
    </div>
  );
};

export default Course;
