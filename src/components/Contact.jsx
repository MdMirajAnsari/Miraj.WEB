import { useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { send, sendHover } from '../assets';

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
const formSubmitEndpoint = import.meta.env.VITE_FORMSUBMIT_ENDPOINT;

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.company) {
      return;
    }

    if (!formSubmitEndpoint) {
      setNotice({
        type: 'error',
        title: 'Contact form not configured',
        message: `Please email me directly at ${contactEmail}.`,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send message');
      }

      setNotice({
        type: 'success',
        title: 'Message sent',
        message: 'Thank you. I will get back to you as soon as possible.',
      });
      setForm({
        name: '',
        email: '',
        message: '',
        company: '',
      });
    } catch (error) {
      console.error(error);
      setNotice({
        type: 'error',
        title: 'Message not sent',
        message: `Something went wrong. You can email me directly at ${contactEmail}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="-mt-[8rem] xl:flex-row flex-col-reverse 
      flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] glass-card p-6 sm:p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadTextLight}>Contact.</h3>

        {notice && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`mt-6 rounded-2xl border p-4 shadow-xl backdrop-blur-md ${
              notice.type === 'success'
                ? 'border-emerald-300/30 bg-emerald-400/15'
                : 'border-rose-300/30 bg-rose-400/15'
            }`}
            role="status"
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[18px] font-bold ${
                  notice.type === 'success'
                    ? 'bg-emerald-400/25 text-emerald-100'
                    : 'bg-rose-400/25 text-rose-100'
                }`}
              >
                {notice.type === 'success' ? 'OK' : '!'}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-beckman text-[18px] font-bold text-white">
                  {notice.title}
                </h4>
                <p className="mt-1 text-[14px] leading-6 text-timberWolf">
                  {notice.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNotice(null)}
                className="rounded-full px-3 py-1 text-[18px] leading-none text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Dismiss message"
              >
                x
              </button>
            </div>
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6 font-poppins">
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
            className="hidden"
          />
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="What's your name?"
              className="glass-button py-4 px-6
              placeholder:text-taupe
              text-timberWolf rounded-lg outline-none
              border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="What's your email?"
              className="glass-button py-4 px-6
              placeholder:text-taupe
              text-timberWolf rounded-lg outline-none
              border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-4">
              Your Message
            </span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="What's your message?"
              className="glass-button py-4 px-6
              placeholder:text-taupe
              text-timberWolf rounded-lg outline-none
              border-none font-medium resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="live-demo flex justify-center sm:gap-4 
            gap-3 sm:text-[20px] text-[16px] text-timberWolf 
            font-bold font-beckman items-center py-5
            whitespace-nowrap sm:w-[130px] sm:h-[50px] 
            w-[100px] h-[45px] rounded-[10px] glass-button
            hover:text-white 
            transition duration-[0.2s] ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
            onMouseOver={() => {
              document
                .querySelector('.contact-btn')
                .setAttribute('src', sendHover);
            }}
            onMouseOut={() => {
              document.querySelector('.contact-btn').setAttribute('src', send);
            }}>
            {loading ? 'Sending' : 'Send'}
            <img
              src={send}
              alt="send"
              className="contact-btn sm:w-[26px] sm:h-[26px] 
              w-[23px] h-[23px] object-contain"
            />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
