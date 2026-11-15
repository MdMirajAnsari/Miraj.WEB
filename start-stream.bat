@echo off
title Repo-Play Cloud Streamer
cd /d "%~dp0"

echo ======================================================================
echo 🎬 Initializing Repo-Play Cloud Streamer...
echo ======================================================================

:: Clean up any lingering background cloudflared or port 4201 processes
taskkill /f /im cloudflared.exe >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4201') do (
    taskkill /f /pid %%a >nul 2>&1
)

node scripts/start-cloud-stream.mjs
pause
