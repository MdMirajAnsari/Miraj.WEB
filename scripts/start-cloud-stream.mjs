import { spawn } from 'child_process';
import http from 'http';
import https from 'https';
import fs from 'fs';

const CLOUDFLARED_PATH = 'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe';
const MEDIA_SERVER_PORT = 4201;

function checkMediaServerRunning() {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${MEDIA_SERVER_PORT}/health`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function getShortUrl(targetUrl) {
  return new Promise((resolve) => {
    const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(targetUrl)}`;
    https
      .get(apiUrl, (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            resolve(data.shorturl || targetUrl);
          } catch {
            resolve(targetUrl);
          }
        });
      })
      .on('error', () => resolve(targetUrl));
  });
}

async function main() {
  console.log('\n======================================================');
  console.log('🚀 Starting Repo-Play Live Cloud Stream for Vercel...');
  console.log('======================================================\n');

  // 1. Ensure media server is running
  const isRunning = await checkMediaServerRunning();
  if (!isRunning) {
    console.log('📡 Launching background media server on port 4201...');
    const serverProc = spawn('node', ['scripts/media-server.mjs'], {
      detached: true,
      stdio: 'inherit',
    });
    serverProc.unref();
    await new Promise((r) => setTimeout(r, 2000));
  } else {
    console.log('✅ Local media server is already running on port 4201.');
  }

  // 2. Launch cloudflared tunnel
  if (!fs.existsSync(CLOUDFLARED_PATH)) {
    console.error(`❌ cloudflared not found at ${CLOUDFLARED_PATH}`);
    process.exit(1);
  }

  console.log('🌐 Opening secure HTTPS tunnel to Cloudflare Edge...');
  const tunnel = spawn(CLOUDFLARED_PATH, ['tunnel', '--url', `http://localhost:${MEDIA_SERVER_PORT}`]);

  let tunnelUrlFound = false;

  const handleOutput = async (data) => {
    const text = data.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match && !tunnelUrlFound) {
      tunnelUrlFound = true;
      const tunnelUrl = match[0];
      const longUrl = `https://mirajai.vercel.app/movies?endpoint=${encodeURIComponent(tunnelUrl)}`;
      const shortUrl = await getShortUrl(longUrl);

      console.log('\n======================================================================');
      console.log('🎉 YOUR CLOUD STREAM IS LIVE!');
      console.log('======================================================================');
      console.log(`\n🔗 ULTRA SHORT 1-CLICK URL:`);
      console.log(`   👉 ${shortUrl}`);
      console.log(`\n🌐 DIRECT APP URL:`);
      console.log(`   👉 https://mirajai.vercel.app/movies`);
      console.log(`\n📱 PERMANENT SHORTCUT:`);
      console.log(`   👉 https://is.gd/mirajmovies  (or https://is.gd/mirajplay)`);
      console.log('======================================================================\n');
      console.log('💡 Keep this terminal window open while streaming movies to Vercel.');
    }
  };

  tunnel.stdout.on('data', handleOutput);
  tunnel.stderr.on('data', handleOutput);

  tunnel.on('close', (code) => {
    console.log(`Tunnel closed with code ${code}`);
  });
}

main();
