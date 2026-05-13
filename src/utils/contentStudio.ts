import type { Gadget, Project } from '../models';

export interface StudioBlogDraft {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  markdown: string;
}

export interface StudioCourseDraft {
  id: string;
  title: string;
  provider: string;
  notes: string;
  url: string;
}

export interface StudioContent {
  projects: Project[];
  gadgets: Gadget[];
  blogs: StudioBlogDraft[];
  courses: StudioCourseDraft[];
}

export const contentStudioStorageKey = 'miraj-content-studio';

export const emptyStudioContent: StudioContent = {
  projects: [],
  gadgets: [],
  blogs: [],
  courses: [],
};

export const readStudioContent = (): StudioContent => {
  if (typeof window === 'undefined') {
    return emptyStudioContent;
  }

  try {
    const parsedContent = JSON.parse(window.localStorage.getItem(contentStudioStorageKey) || '');

    return {
      projects: Array.isArray(parsedContent?.projects) ? parsedContent.projects : [],
      gadgets: Array.isArray(parsedContent?.gadgets) ? parsedContent.gadgets : [],
      blogs: Array.isArray(parsedContent?.blogs) ? parsedContent.blogs : [],
      courses: Array.isArray(parsedContent?.courses) ? parsedContent.courses : [],
    };
  } catch {
    return emptyStudioContent;
  }
};

export const writeStudioContent = (content: StudioContent) => {
  window.localStorage.setItem(contentStudioStorageKey, JSON.stringify(content, null, 2));
};

export const mergeById = <T extends { id: string }>(baseItems: T[], draftItems: T[]) => {
  const draftIds = new Set(draftItems.map((item) => item.id));

  return [...draftItems, ...baseItems.filter((item) => !draftIds.has(item.id))];
};
