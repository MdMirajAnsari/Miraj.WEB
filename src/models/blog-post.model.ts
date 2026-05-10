export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  image: string;
  author?: string;
  content?: string;
  markdownUrl?: string;
  tags?: string[];
}

export interface DecoratedBlogPost extends BlogPost {
  tags: string[];
  isPinned: boolean;
}
