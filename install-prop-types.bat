@echo off
echo ========================================
echo   Installing prop-types package
echo ========================================
echo.

cd /d "%~dp0"
npm install prop-types

echo.
echo ========================================
echo   Installation complete!
echo ========================================
echo.
echo Press any key to close...
pause > nul
