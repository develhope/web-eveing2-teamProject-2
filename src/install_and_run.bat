@echo off
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
  echo npm install failed. Ensure Node.js and npm are installed and try again.
  pause
  exit /b 1
)
echo.
echo Starting dev server...
call npm run dev
