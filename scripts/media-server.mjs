import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4201;
export const REPO_PLAY_DIR = path.resolve(process.env.REPO_PLAY_DIR || 'C:/Users/Miraj/source/repos/repo-play');
export const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mkv', '.mov', '.m4v', '.ogv', '.avi'];

if (!fs.existsSync(REPO_PLAY_DIR)) {
  fs.mkdirSync(REPO_PLAY_DIR, { recursive: true });
}

// Find local IPv4 address
export function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

export function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function createMediaServer() {
  const server = http.createServer((req, res) => {
    // CORS Headers for cross-origin access from hosted web apps
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Authorization, Access-Control-Request-Private-Network, Bypass-Tunnel-Reminder');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length');
    res.setHeader('Access-Control-Allow-Private-Network', 'true');

    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }

    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(urlObj.pathname);

    // Health / Ping check
    if (pathname === '/health' || pathname === '/') {
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({
          status: 'ok',
          service: 'repo-play-media-server',
          directory: REPO_PLAY_DIR,
          localIp: getLocalIp(),
          port: PORT,
        }),
      );
      return;
    }

    // 1. List Movies endpoint
    if (pathname === '/api/movies') {
      try {
        const files = fs.readdirSync(REPO_PLAY_DIR);
        const rawMovies = files
          .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return VIDEO_EXTENSIONS.includes(ext);
          })
          .map((file, idx) => {
            const fullPath = path.join(REPO_PLAY_DIR, file);
            const stats = fs.statSync(fullPath);
            const ext = path.extname(file).toLowerCase().replace('.', '');
            const cleanTitle = path
              .basename(file, path.extname(file))
              .replace(/[-_.]+/g, ' ')
              .trim();

            return {
              id: `media-${idx + 1}-${encodeURIComponent(file)}`,
              filename: file,
              title: cleanTitle,
              extension: ext,
              size: stats.size,
              sizeFormatted: formatSize(stats.size),
              modified: stats.mtime.toISOString(),
              streamUrl: `/movies-media/${encodeURIComponent(file)}`,
            };
          });

        // Deduplicate: if both mp4 and mkv exist for same title, prefer mp4
        const movieMap = new Map();
        for (const m of rawMovies) {
          const key = m.title.toLowerCase();
          if (!movieMap.has(key)) {
            movieMap.set(key, m);
          } else if (m.extension === 'mp4' && movieMap.get(key).extension !== 'mp4') {
            movieMap.set(key, m);
          }
        }
        const movies = Array.from(movieMap.values());

        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            movies,
            directory: REPO_PLAY_DIR,
            exists: true,
            count: movies.length,
            serverIp: getLocalIp(),
          }),
        );
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message, movies: [] }));
      }
      return;
    }

    // 2. Stream Media with HTTP Range support
    if (pathname.startsWith('/movies-media/')) {
      const filename = pathname.replace('/movies-media/', '');
      const filePath = path.join(REPO_PLAY_DIR, filename);

      if (!fs.existsSync(filePath)) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Video not found in repo-play');
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

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': contentType,
        });
        fileStream.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
        });
        fs.createReadStream(filePath).pipe(res);
      }
      return;
    }

    res.statusCode = 404;
    res.end('Not found');
  });

  return server;
}

// Standalone entrypoint
const server = createMediaServer();
server.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log('\n======================================================');
  console.log('🎬 Repo-Play LAN Media Server is running!');
  console.log(`📁 Directory: ${REPO_PLAY_DIR}`);
  console.log(`➜ Local:      http://localhost:${PORT}`);
  console.log(`➜ Same Wi-Fi: http://${localIp}:${PORT}`);
  console.log('======================================================\n');
});
