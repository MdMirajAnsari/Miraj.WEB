import { spawn, exec } from 'child_process';
import http from 'http';
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

async function main() {
  console.log('\n======================================================');
  console.log('🚀 Starting Repo-Play Cloud Streamer...');
  console.log('======================================================\n');

  // 1. Ensure media server is running on port 4201
  const isRunning = await checkMediaServerRunning();
  if (!isRunning) {
    console.log('📡 Starting local media server on port 4201...');
    const serverProc = spawn('node', ['scripts/media-server.mjs'], {
      detached: true,
      stdio: 'inherit',
    });
    serverProc.unref();
    await new Promise((r) => setTimeout(r, 2000));
  } else {
    console.log('✅ Local media server is active on port 4201.');
  }

  // 2. Launch cloudflared tunnel
  if (!fs.existsSync(CLOUDFLARED_PATH)) {
    console.error(`\n❌ cloudflared not found at ${CLOUDFLARED_PATH}`);
    process.exit(1);
  }

  console.log('🌐 Connecting to Cloudflare Edge Network...');
  const tunnel = spawn(CLOUDFLARED_PATH, ['tunnel', '--url', `http://localhost:${MEDIA_SERVER_PORT}`]);

  let tunnelUrlFound = false;

  const handleOutput = (data) => {
    const text = data.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match && !tunnelUrlFound) {
      tunnelUrlFound = true;
      const tunnelUrl = match[0];
      const vercelUrl = `https://mirajai.vercel.app/movies?endpoint=${encodeURIComponent(tunnelUrl)}`;

      console.log('\n======================================================================');
      console.log('🎬 REPO-PLAY CLOUD STREAM IS READY!');
      console.log('======================================================================');
      console.log('\n👉 YOUR DIRECT ACCESS LINK (Click or Copy):');
      console.log(`\n   ${vercelUrl}\n`);
      console.log('======================================================================');
      console.log(`📁 Local Directory: C:\\Users\\Miraj\\source\\repos\\repo-play`);
      console.log(`⚡ Live Tunnel:     ${tunnelUrl}`);
      console.log('======================================================================\n');
      console.log('🌐 Opening your browser automatically...');
      console.log('💡 Keep this window open while watching your movies!\n');

      // Automatically launch in default browser
      exec(`start "" "${vercelUrl}"`);
    }
  };

  tunnel.stdout.on('data', handleOutput);
  tunnel.stderr.on('data', handleOutput);

  tunnel.on('close', (code) => {
    console.log(`\nTunnel closed (exit code ${code})`);
  });
}

main();
