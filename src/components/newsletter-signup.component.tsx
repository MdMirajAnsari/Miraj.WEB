import { FormEvent, useState } from 'react';
import { isSupabaseConfigured, subscribeToNewsletter, trackUmamiEvent } from '../utils/integrations';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await subscribeToNewsletter(email.trim());
      trackUmamiEvent('newsletter_subscribe', { source: 'blog' });
      setEmail('');
      setStatus(isSupabaseConfigured ? 'Subscribed.' : 'Saved locally until Supabase is configured.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to subscribe right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-card rounded-lg p-5">
      <h2 className="text-white text-lg font-semibold mb-3">Newsletter</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-indigo-300"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full glass-button-active rounded-lg px-4 py-3 text-sm text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status && <p className="mt-3 text-xs text-gray-300">{status}</p>}
    </section>
  );
};

export default NewsletterSignup;
