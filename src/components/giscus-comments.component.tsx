import { useEffect, useRef } from 'react';
import { integrations, isGiscusConfigured } from '../utils/integrations';

const GiscusComments = ({ term }: { term: string }) => {
  const commentsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!commentsRef.current || !isGiscusConfigured) return undefined;

    commentsRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', integrations.giscus.repo);
    script.setAttribute('data-repo-id', integrations.giscus.repoId);
    script.setAttribute('data-category', integrations.giscus.category);
    script.setAttribute('data-category-id', integrations.giscus.categoryId);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'transparent_dark');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    commentsRef.current.appendChild(script);

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [term]);

  if (!isGiscusConfigured) {
    return (
      <section className="mt-12 glass-card rounded-lg p-5 sm:p-6">
        <h2 className="text-white text-2xl font-beckman font-bold mb-3">Comments</h2>
        <p className="text-gray-300 leading-7">
          Add the Giscus repository, repository id, and category id env values to enable GitHub Discussions comments here.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12 glass-card rounded-lg p-5 sm:p-6">
      <h2 className="text-white text-2xl font-beckman font-bold mb-5">Comments</h2>
      <div ref={commentsRef} />
    </section>
  );
};

export default GiscusComments;
