@echo off
echo ========================================
echo   Starting Netsanet Portfolio
echo   (PowerShell Bypass Method)
echo ========================================
echo.

REM Run npm through PowerShell with execution policy bypass
powershell -ExecutionPolicy Bypass -Command "cd '%~dp0'; npm run dev"

if errorlevel 1 (
    echo.
    echo Error occurred. Press any key to close...
    pause > nul
)
