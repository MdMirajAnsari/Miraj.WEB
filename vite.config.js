import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function repoPlayPlugin() {
  const repoPlayDir = path.resolve('C:/Users/Miraj/source/repos/repo-play');
  const publicMoviesDir = path.resolve('public/movies');
  const videoExtensions = ['.mp4', '.webm', '.mkv', '.mov', '.m4v', '.ogv', '.avi'];

  const getTargetDir = () => {
    if (fs.existsSync(repoPlayDir)) return repoPlayDir;
    if (fs.existsSync(publicMoviesDir)) return publicMoviesDir;
    return repoPlayDir;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const setupMiddlewares = (server) => {
    // 1. API endpoint to list all video files in repo-play
    server.middlewares.use('/api/movies', (req, res, next) => {
      if (req.method !== 'GET') return next();

      const targetDir = getTargetDir();
      if (!fs.existsSync(targetDir)) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ movies: [], directory: targetDir, exists: false }));
        return;
      }

      try {
        const files = fs.readdirSync(targetDir);
        const movies = files
          .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return videoExtensions.includes(ext);
          })
          .map((file, idx) => {
            const fullPath = path.join(targetDir, file);
            const stats = fs.statSync(fullPath);
            const ext = path.extname(file).toLowerCase().replace('.', '');
            const cleanTitle = path
              .basename(file, path.extname(file))
              .replace(/[-_.]+/g, ' ')
              .trim();

            return {
              id: `movie-${idx + 1}-${encodeURIComponent(file)}`,
              filename: file,
              title: cleanTitle,
              extension: ext,
              size: stats.size,
              sizeFormatted: formatSize(stats.size),
              modified: stats.mtime.toISOString(),
              streamUrl: `/movies-media/${encodeURIComponent(file)}`,
            };
          });

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify({ movies, directory: targetDir, exists: true }));
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message, movies: [] }));
      }
    });

    // 2. Stream video with HTTP Range header support (for video seeking/scrubbing)
    server.middlewares.use('/movies-media', (req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') return next();

      const targetDir = getTargetDir();
      const rawUrl = req.url || '';
      const rawFilename = rawUrl.replace(/^\//, '').split('?')[0];
      const filename = decodeURIComponent(rawFilename);
      const filePath = path.join(targetDir, filename);

      if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Video not found');
        return;
      }

      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;
      const ext = path.extname(filePath).toLowerCase();

      const mimeTypes = {
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mkv': 'video/x-matroska',
        '.mov': 'video/quicktime',
        '.m4v': 'video/x-m4v',
        '.ogv': 'video/ogg',
        '.avi': 'video/x-msvideo',
      };
      const contentType = mimeTypes[ext] || 'video/mp4';

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
        };

        res.writeHead(206, head);
        fileStream.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*',
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
      }
    });
  };

  return {
    name: 'vite-plugin-repo-play',
    configureServer(server) {
      setupMiddlewares(server);
    },
    configurePreviewServer(server) {
      setupMiddlewares(server);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), repoPlayPlugin()],
  server: {
    host: '0.0.0.0',
    port: 4200,
    fs: {
      allow: ['..', 'C:/Users/Miraj/source/repos/repo-play'],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4200,
  },
});
