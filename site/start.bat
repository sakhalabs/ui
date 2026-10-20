@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
)
start "" http://localhost:4321
call npm.cmd run dev
