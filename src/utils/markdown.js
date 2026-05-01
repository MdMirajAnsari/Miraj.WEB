export const toRawMarkdownUrl = (url) => {
  if (!url) return '';

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === 'github.com') {
      const parts = parsedUrl.pathname.split('/').filter(Boolean);
      const blobIndex = parts.indexOf('blob');

      if (blobIndex !== -1 && parts.length > blobIndex + 2) {
        const owner = parts[0];
        const repo = parts[1];
        const branch = parts[blobIndex + 1];
        const filePath = parts.slice(blobIndex + 2).join('/');

        return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
      }
    }

    return url;
  } catch {
    return url;
  }
};
