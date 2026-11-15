@echo off
title Repo-Play Cloud Streamer
cd /d "%~dp0"
echo Starting Repo-Play Media Server and Cloudflare Tunnel...
node scripts/start-cloud-stream.mjs
pause
