@echo off
echo ========================================
echo FuelPrice Tallinn - Starting Application
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Installing server dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install server dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Installing client dependencies...
cd client
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install client dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo Step 3: Setting up database...
call npm run db:push
if errorlevel 1 (
    echo ERROR: Failed to setup database
    pause
    exit /b 1
)

call npm run db:generate
if errorlevel 1 (
    echo ERROR: Failed to generate Prisma client
    pause
    exit /b 1
)

echo.
echo Step 4: Starting application...
echo.
echo Backend will run on: http://localhost:3001
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

call npm run dev

pause
