import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

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

  const handleOutput = (data) => {
    const text = data.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match && !tunnelUrlFound) {
      tunnelUrlFound = true;
      const tunnelUrl = match[0];
      const directAppUrl = `https://mirajai.vercel.app/movies?endpoint=${encodeURIComponent(tunnelUrl)}`;

      console.log('\n======================================================================');
      console.log('🎉 YOUR CLOUD STREAM IS LIVE!');
      console.log('======================================================================');
      console.log(`➜ Cloudflare HTTPS Stream: ${tunnelUrl}`);
      console.log(`\n👉 CLICK HERE TO OPEN IN YOUR HOSTED VERCEL APP:`);
      console.log(`   ${directAppUrl}`);
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
