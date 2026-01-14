@echo off
echo ========================================
echo   Starting Netsanet Portfolio
echo ========================================
echo.
echo Opening development server...
echo This may take a few seconds...
echo.

REM Change to the script directory
cd /d "%~dp0"

REM Start the development server using npx to bypass PowerShell
echo Starting Vite server...
npx vite

REM Keep window open if there's an error
if errorlevel 1 (
    echo.
    echo ========================================
    echo   Error starting server!
    echo ========================================
    echo.
    echo Press any key to close...
    pause > nul
)
