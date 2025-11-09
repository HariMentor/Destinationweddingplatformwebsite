@echo off
echo.
echo Checking Development Server Status...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed
    echo   Please install Node.js 18.0.0 or higher
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo * Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X npm is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo * npm version: %NPM_VERSION%
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ! node_modules not found
    echo   Run: npm install
    echo.
)

REM Check if .next exists
if not exist ".next" (
    echo i .next folder not found ^(normal for first run^)
    echo.
)

REM Check port 3000
echo Checking port 3000 ^(Next.js^)...
netstat -ano | findstr :3000 | findstr LISTENING >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo * Something is running on port 3000
) else (
    echo ! Nothing running on port 3000
    echo   This is where Next.js should run
)
echo.

REM Check port 5173
echo Checking port 5173 ^(Vite^)...
netstat -ano | findstr :5173 | findstr LISTENING >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo X Vite is running on port 5173
    echo   ! THIS IS THE PROBLEM!
    echo   You need to stop Vite and run Next.js instead
    echo.
    echo   To fix:
    echo   1. Stop the Vite server ^(Ctrl+C^)
    echo   2. Run: npm run dev
) else (
    echo * Port 5173 is free ^(good - Vite is not running^)
)
echo.

echo ================================================
echo.
echo SUMMARY:
echo.

netstat -ano | findstr :5173 | findstr LISTENING >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo X PROBLEM DETECTED!
    echo   You are running Vite ^(port 5173^)
    echo   This is a Next.js project - you need to run Next.js
    echo.
    echo   TO FIX:
    echo   1. Stop the current server ^(Ctrl+C^)
    echo   2. Run: npm run dev
    echo   3. Open: http://localhost:3000
) else (
    netstat -ano | findstr :3000 | findstr LISTENING >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo * LOOKS GOOD!
        echo   Next.js appears to be running on port 3000
        echo.
        echo   Open your browser at: http://localhost:3000
        echo   Password: wedzway2025
    ) else (
        echo i NO SERVER RUNNING
        echo.
        echo   TO START:
        echo   1. Run: npm install ^(if you haven't^)
        echo   2. Run: npm run dev
        echo   3. Open: http://localhost:3000
    )
)

echo.
echo ================================================
echo.
pause
