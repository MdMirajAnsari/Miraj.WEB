import { useMemo, useState } from 'react';
import { styles } from '../styles';
import {
  emptyStudioContent,
  readStudioContent,
  writeStudioContent,
  type StudioContent,
} from '../utils/contentStudio';

const tabs = ['projects', 'gadgets', 'blogs', 'courses'] as const;
type StudioTab = (typeof tabs)[number];

const createId = (prefix: string, title: string) =>
  `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || Date.now()}`;

const ContentStudio = () => {
  const [content, setContent] = useState<StudioContent>(() => readStudioContent());
  const [activeTab, setActiveTab] = useState<StudioTab>('projects');
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    tags: '',
    price: '',
    specs: '',
    category: '',
    markdown: '',
    provider: '',
  });

  const counts = useMemo(
    () => ({
      projects: content.projects.length,
      gadgets: content.gadgets.length,
      blogs: content.blogs.length,
      courses: content.courses.length,
    }),
    [content],
  );

  const updateDraft = (field: string, value: string) => {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }));
  };

  const persistContent = (nextContent: StudioContent, message: string) => {
    setContent(nextContent);
    writeStudioContent(nextContent);
    setStatus(message);
  };

  const resetDraft = () => {
    setDraft({
      title: '',
      description: '',
      image: '',
      url: '',
      tags: '',
      price: '',
      specs: '',
      category: '',
      markdown: '',
      provider: '',
    });
  };

  const addDraft = () => {
    if (!draft.title.trim()) {
      setStatus('Add a title before saving.');
      return;
    }

    const title = draft.title.trim();
    const nextContent = { ...content };

    if (activeTab === 'projects') {
      nextContent.projects = [
        {
          id: createId('studio-project', title),
          name: title,
          description: draft.description,
          image: draft.image || 'https://via.placeholder.com/900x600?text=Project',
          demo: draft.url || '#',
          tags: draft.tags.split(',').map((tag) => ({ name: tag.trim(), color: 'blue-text-gradient' })).filter((tag) => tag.name),
        },
        ...content.projects,
      ];
    }

    if (activeTab === 'gadgets') {
      nextContent.gadgets = [
        {
          id: createId('studio-gadget', title),
          name: title,
          description: draft.description,
          image: draft.image || 'https://via.placeholder.com/900x600?text=Gadget',
          price: draft.price,
          link: draft.url,
          specs: draft.specs.split(',').map((spec) => spec.trim()).filter(Boolean),
        },
        ...content.gadgets,
      ];
    }

    if (activeTab === 'blogs') {
      nextContent.blogs = [
        {
          id: createId('studio-blog', title),
          title,
          category: draft.category || 'Draft',
          excerpt: draft.description,
          markdown: draft.markdown,
        },
        ...content.blogs,
      ];
    }

    if (activeTab === 'courses') {
      nextContent.courses = [
        {
          id: createId('studio-course', title),
          title,
          provider: draft.provider,
          notes: draft.description,
          url: draft.url,
        },
        ...content.courses,
      ];
    }

    persistContent(nextContent, `${title} saved to ${activeTab}.`);
    resetDraft();
  };

  const importJson = (value: string) => {
    try {
      const parsedContent = JSON.parse(value);
      const nextContent = {
        projects: Array.isArray(parsedContent.projects) ? parsedContent.projects : [],
        gadgets: Array.isArray(parsedContent.gadgets) ? parsedContent.gadgets : [],
        blogs: Array.isArray(parsedContent.blogs) ? parsedContent.blogs : [],
        courses: Array.isArray(parsedContent.courses) ? parsedContent.courses : [],
      };

      persistContent(nextContent, 'Imported content JSON.');
    } catch {
      setStatus('That JSON could not be imported.');
    }
  };

  const clearContent = () => {
    persistContent(emptyStudioContent, 'Local studio content cleared.');
  };

  return (
    <main className={`${styles.padding} max-w-7xl mx-auto relative z-0 min-h-screen pt-[110px] pb-16`}>
      <div className="mb-8">
        <p className={`${styles.sectionSubText}`}>Local Workflow</p>
        <h1 className={`${styles.sectionHeadTextLight}`}>Content Studio.</h1>
        <p className="mt-4 max-w-3xl text-taupe text-[18px] leading-[30px]">
          Draft portfolio content without editing source constants. Project and gadget drafts appear on the live pages, and everything can be exported as JSON for a future commit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="glass-card rounded-[16px] p-4 h-fit">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-[10px] px-4 py-3 text-left capitalize ${activeTab === tab ? 'glass-button-active text-white' : 'glass-button text-taupe'}`}
              >
                {tab} ({counts[tab]})
              </button>
            ))}
          </div>
          <button type="button" onClick={clearContent} className="mt-4 w-full rounded-[10px] px-4 py-3 glass-button text-white">
            Clear Local Drafts
          </button>
        </aside>

        <section className="glass-card rounded-[16px] p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} placeholder="Title or name" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
            <input value={draft.image} onChange={(event) => updateDraft('image', event.target.value)} placeholder="Image URL" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
            <input value={draft.url} onChange={(event) => updateDraft('url', event.target.value)} placeholder="Demo, product, blog, or course URL" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
            {activeTab === 'projects' && (
              <input value={draft.tags} onChange={(event) => updateDraft('tags', event.target.value)} placeholder="Tags, comma separated" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
            )}
            {activeTab === 'gadgets' && (
              <>
                <input value={draft.price} onChange={(event) => updateDraft('price', event.target.value)} placeholder="Price" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
                <input value={draft.specs} onChange={(event) => updateDraft('specs', event.target.value)} placeholder="Specs, comma separated" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
              </>
            )}
            {activeTab === 'blogs' && (
              <input value={draft.category} onChange={(event) => updateDraft('category', event.target.value)} placeholder="Category" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
            )}
            {activeTab === 'courses' && (
              <input value={draft.provider} onChange={(event) => updateDraft('provider', event.target.value)} placeholder="Provider" className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none" />
            )}
          </div>

          <textarea
            value={draft.description}
            onChange={(event) => updateDraft('description', event.target.value)}
            placeholder="Description, excerpt, or notes"
            rows={4}
            className="mt-4 w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none"
          />

          {activeTab === 'blogs' && (
            <textarea
              value={draft.markdown}
              onChange={(event) => updateDraft('markdown', event.target.value)}
              placeholder="Markdown body"
              rows={8}
              className="mt-4 w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none font-mono"
            />
          )}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="button" onClick={addDraft} className="glass-button-active rounded-[10px] px-5 py-3 text-white">
              Save Draft
            </button>
            {status && <span className="text-sm text-blue-200">{status}</span>}
          </div>

          <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div>
              <h2 className="text-white text-xl font-semibold">Export JSON</h2>
              <textarea readOnly value={JSON.stringify(content, null, 2)} rows={16} className="mt-3 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-xs text-gray-200 outline-none font-mono" />
            </div>
            <div>
              <h2 className="text-white text-xl font-semibold">Import JSON</h2>
              <textarea onBlur={(event) => event.currentTarget.value.trim() && importJson(event.currentTarget.value)} rows={16} placeholder="Paste exported Content Studio JSON here, then leave the field." className="mt-3 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-xs text-gray-200 placeholder:text-gray-500 outline-none font-mono" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContentStudio;
