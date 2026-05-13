import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Mohammad Miraj | Software Engineer Portfolio',
    description: 'Portfolio of Mohammad Miraj, a software engineer in Bangalore working with .NET, React, cloud, and product engineering.',
  },
  '/course': {
    title: 'Courses | Mohammad Miraj',
    description: 'Curated courses and learning references from Mohammad Miraj.',
  },
  '/gadgets': {
    title: 'Gadgets | Mohammad Miraj',
    description: 'Developer gadgets, tools, and workspace gear used by Mohammad Miraj.',
  },
  '/blog': {
    title: 'Blog | Mohammad Miraj',
    description: 'Technical articles, notes, and interview preparation resources by Mohammad Miraj.',
  },
  '/gallery': {
    title: 'Gallery | Mohammad Miraj',
    description: 'A visual gallery from Mohammad Miraj.',
  },
  '/youtube': {
    title: 'YouTube | Mohammad Miraj',
    description: 'Favorite and useful YouTube videos curated by Mohammad Miraj.',
  },
  '/gov': {
    title: 'Government Links | Mohammad Miraj',
    description: 'Useful government links and resources curated by Mohammad Miraj.',
  },
  '/content-studio': {
    title: 'Content Studio | Mohammad Miraj',
    description: 'Local content workflow for drafting portfolio projects, gadgets, blogs, and courses.',
  },
};

const upsertMeta = (name: string, content: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', content);
};

const Seo = () => {
  const location = useLocation();

  useEffect(() => {
    const routeKey = location.pathname.startsWith('/blog/') ? '/blog' : location.pathname;
    const meta = routeMeta[routeKey] || routeMeta['/'];

    document.title = meta.title;
    upsertMeta('description', meta.description);
    upsertMeta('og:title', meta.title);
    upsertMeta('og:description', meta.description);
  }, [location.pathname]);

  return null;
};

export default Seo;
