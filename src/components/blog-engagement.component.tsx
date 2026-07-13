import { useEffect, useState } from 'react';
import {
  getBlogEngagement,
  isSupabaseConfigured,
  saveBlogEngagement,
  trackUmamiEvent,
  type BlogEngagement as BlogEngagementState,
} from '../utils/integrations';

const localKey = (postId: number) => `miraj-blog-engagement-${postId}`;

const readLocalEngagement = (postId: number): BlogEngagementState => {
  try {
    return JSON.parse(window.localStorage.getItem(localKey(postId)) || '{"likes":0,"bookmarks":0}');
  } catch {
    return { likes: 0, bookmarks: 0 };
  }
};

const writeLocalEngagement = (postId: number, engagement: BlogEngagementState) => {
  window.localStorage.setItem(localKey(postId), JSON.stringify(engagement));
};

const BlogEngagement = ({ postId, title }: { postId: number; title: string }) => {
  const [engagement, setEngagement] = useState<BlogEngagementState>(() => readLocalEngagement(postId));
  const [status, setStatus] = useState('');

  useEffect(() => {
    let isMounted = true;

    getBlogEngagement(postId)
      .then((remoteEngagement) => {
        if (isMounted) {
          setEngagement(remoteEngagement);
          writeLocalEngagement(postId, remoteEngagement);
        }
      })
      .catch(() => {
        setStatus(isSupabaseConfigured ? 'Live reactions are temporarily unavailable.' : '');
      });

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const updateEngagement = async (field: keyof BlogEngagementState) => {
    const nextEngagement = {
      ...engagement,
      [field]: engagement[field] + 1,
    };

    setEngagement(nextEngagement);
    writeLocalEngagement(postId, nextEngagement);
    trackUmamiEvent(`blog_${field}`, { postId, title });

    try {
      await saveBlogEngagement(postId, nextEngagement);
      setStatus(isSupabaseConfigured ? 'Saved live.' : 'Saved locally.');
    } catch {
      setStatus('Saved locally. Live sync failed.');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => updateEngagement('likes')}
        className="glass-button text-white px-4 py-2 rounded-lg"
      >
        Like {engagement.likes}
      </button>
      <button
        type="button"
        onClick={() => updateEngagement('bookmarks')}
        className="glass-button text-white px-4 py-2 rounded-lg"
      >
        Save {engagement.bookmarks}
      </button>
      {status && <span className="text-xs text-gray-400">{status}</span>}
    </div>
  );
};

export default BlogEngagement;
