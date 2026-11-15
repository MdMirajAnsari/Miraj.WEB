import { spawn, exec } from 'child_process';
import net from 'net';
import fs from 'fs';
import { createMediaServer, getLocalIp, getMovieList, PORT, REPO_PLAY_DIR } from './media-server.mjs';

const CLOUDFLARED_PATH = 'C:\\Program Files (x86)\\cloudflared\\cloudflared.exe';
const TARGET_EMAIL = 'clevercottonmouth@gmail.com';
const FORMSUBMIT_TOKEN = '8afc617e303d56fd038545b21c3045de';

function checkPortOpen(port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(800);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, '127.0.0.1');
  });
}

function startLocalServer() {
  return new Promise((resolve) => {
    const server = createMediaServer();

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`✅ Media server is already active on port ${PORT}.`);
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

async function sendStreamLinksToEmail({ tunnelUrl, directAppUrl }) {
  console.log(`\n📧 Sending streaming links to ${TARGET_EMAIL}...`);

  const localIp = getLocalIp();
  const movies = getMovieList();

  const movieListFormatted =
    movies.length > 0
      ? movies
          .map(
            (m, idx) =>
              `${idx + 1}. ${m.title} (${m.sizeFormatted}) [${m.extension.toUpperCase()}]`,
          )
          .join('\n')
      : 'No movies found in repo-play folder';

  const payload = {
    _subject: `🎬 Repo-Play Stream is LIVE! (${movies.length} movies ready)`,
    Direct_Vercel_Link: directAppUrl,
    Cloudflare_Tunnel_URL: tunnelUrl,
    Home_WiFi_Link: `http://${localIp}:${PORT}`,
    Movies_Folder: REPO_PLAY_DIR,
    Total_Videos: `${movies.length} available`,
    Available_Movies: movieListFormatted,
    Stream_Started_At: new Date().toLocaleString(),
    _template: 'table',
    _captcha: 'false',
  };

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'https://mirajai.vercel.app/',
        'Origin': 'https://mirajai.vercel.app',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success === 'true' || res.ok) {
      console.log(`✉️  SUCCESS: All streaming links delivered to ${TARGET_EMAIL}!\n`);
    } else {
      console.warn(`⚠️  Email notice response:`, data.message || data);
    }
  } catch (err) {
    console.warn(`⚠️  Could not send email notification:`, err.message);
  }
}

async function main() {
  console.log('\n======================================================================');
  console.log('🎬 Repo-Play Cloudflare Streamer');
  console.log(`📧 Links auto-delivered to: ${TARGET_EMAIL}`);
  console.log('======================================================================\n');

  if (!fs.existsSync(CLOUDFLARED_PATH)) {
    console.error(`❌ cloudflared.exe not found at ${CLOUDFLARED_PATH}`);
    process.exit(1);
  }

  // 1. Ensure media server is running on port 4201
  const isOpen = await checkPortOpen(PORT);
  if (isOpen) {
    console.log(`✅ Media server is already active on port ${PORT}.`);
  } else {
    await startLocalServer();
  }

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
      const directAppUrl = `https://mirajai.vercel.app/movies?endpoint=${tunnelUrl}`;

      console.log('\n======================================================================');
      console.log('🎉 YOUR CLOUDFLARE STREAM IS LIVE!');
      console.log('======================================================================');
      console.log(`📁 Movies Folder:  ${REPO_PLAY_DIR}`);
      console.log(`⚡ Cloudflare URL:  ${tunnelUrl}`);
      console.log('\n👉 YOUR DIRECT STREAM LINK (Click or Copy):');
      console.log(`\n   ${directAppUrl}\n`);
      console.log('======================================================================');
      console.log('🌐 Opening your browser automatically...');
      console.log('💡 Keep this window open while watching movies on Vercel!');

      // Send email notification to user's Gmail
      sendStreamLinksToEmail({ tunnelUrl, directAppUrl });

      exec(`start "" "${directAppUrl}"`);
    }
  };

  tunnel.stdout.on('data', handleTunnelOutput);
  tunnel.stderr.on('data', handleTunnelOutput);

  tunnel.on('close', (code) => {
    console.log(`\nCloudflare tunnel closed (exit code ${code})`);
    process.exit(code || 0);
  });

  const cleanup = () => {
    try {
      tunnel.kill();
    } catch {}
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
}

main();
