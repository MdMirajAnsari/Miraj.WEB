import { spawn } from 'child_process';
import http from 'http';
import https from 'https';

const MEDIA_SERVER_PORT = 4201;
const FIXED_SUBDOMAIN = 'miraj-movies-player';

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
  console.log('🎬 Starting Repo-Play Permanent Stream for Vercel...');
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

  // 2. Launch fixed subdomain localtunnel
  console.log(`🌐 Connecting to permanent tunnel: https://${FIXED_SUBDOMAIN}.loca.lt ...`);
  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const tunnel = spawn(npxCmd, [
    '--yes',
    'localtunnel',
    '--port',
    String(MEDIA_SERVER_PORT),
    '--subdomain',
    FIXED_SUBDOMAIN,
  ]);

  tunnel.stdout.on('data', (data) => {
    const text = data.toString();
    if (text.includes('your url is:')) {
      console.log('\n======================================================================');
      console.log('🎉 YOUR PERMANENT MOVIE STREAM IS LIVE & CONNECTED!');
      console.log('======================================================================');
      console.log('\n👉 ACCESS DIRECTLY FROM ANY BROWSER / PHONE:');
      console.log('   https://mirajai.vercel.app/movies');
      console.log('\n👉 ULTRA SHORT SHORTCUT:');
      console.log('   https://is.gd/mirajmovies  (or https://is.gd/mirajplay)');
      console.log(`\n🔗 Permanent Backend Stream: https://${FIXED_SUBDOMAIN}.loca.lt`);
      console.log('======================================================================\n');
      console.log('💡 Keep this window open while watching movies on Vercel.');
    }
  });

  tunnel.stderr.on('data', (data) => {
    const text = data.toString();
    if (!text.includes('npm notice')) {
      process.stderr.write(text);
    }
  });

  tunnel.on('close', (code) => {
    console.log(`Tunnel closed with code ${code}`);
  });
}

main();
