import { spawn, exec } from 'child_process';
import http from 'http';
import fs from 'fs';
import { createMediaServer, PORT, REPO_PLAY_DIR } from './media-server.mjs';

const CLOUDFLARED_PATH = 'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe';

function startLocalServer() {
  return new Promise((resolve) => {
    const server = createMediaServer();

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`✅ Media server already running on port ${PORT}.`);
        resolve(true);
      } else {
        console.error('Server error:', err);
        resolve(false);
      }
    });

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Media server started on 0.0.0.0:${PORT}`);
      resolve(true);
    });
  });
}

async function main() {
  console.log('\n======================================================================');
  console.log('🎬 Repo-Play Cloudflare Streamer');
  console.log('======================================================================\n');

  if (!fs.existsSync(CLOUDFLARED_PATH)) {
    console.error(`❌ cloudflared.exe not found at ${CLOUDFLARED_PATH}`);
    process.exit(1);
  }

  // 1. Start media server
  await startLocalServer();

  // 2. Start Cloudflare Tunnel
  console.log('🌐 Connecting to Cloudflare Edge Network...');
  const tunnel = spawn(CLOUDFLARED_PATH, ['tunnel', '--url', `http://127.0.0.1:${PORT}`]);

  let tunnelFound = false;

  const handleTunnelOutput = (chunk) => {
    const text = chunk.toString();
    const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
    if (match && !tunnelFound) {
      tunnelFound = true;
      const tunnelUrl = match[0];
      const directAppUrl = `https://mirajai.vercel.app/movies?endpoint=${encodeURIComponent(tunnelUrl)}`;

      console.log('\n======================================================================');
      console.log('🎉 YOUR CLOUDFLARE STREAM IS LIVE!');
      console.log('======================================================================');
      console.log(`📁 Movies Folder:  ${REPO_PLAY_DIR}`);
      console.log(`⚡ Cloudflare URL:  ${tunnelUrl}`);
      console.log('\n👉 YOUR DIRECT STREAM LINK (Click or Copy):');
      console.log(`\n   ${directAppUrl}\n`);
      console.log('======================================================================');
      console.log('🌐 Opening your browser automatically...');
      console.log('💡 Keep this window open while watching movies on Vercel!\n');

      exec(`start "" "${directAppUrl}"`);
    }
  };

  tunnel.stdout.on('data', handleTunnelOutput);
  tunnel.stderr.on('data', handleTunnelOutput);

  tunnel.on('close', (code) => {
    console.log(`\nCloudflare tunnel closed (exit code ${code})`);
    process.exit(code || 0);
  });

  process.on('SIGINT', () => {
    tunnel.kill();
    process.exit(0);
  });
}

main();
