@echo off
chcp 65001 > nul
title NAP DU LIEU MAU - NOSQL HUIT
cd /d "%~dp0backend"

echo ===============================================================================
echo   DANG NAP DU LIEU MAU MONGODB VA NEO4J CHO DO AN...
echo ===============================================================================
echo.
npm run seed
echo.
echo ===============================================================================
echo   NAP DU LIEU HOAN TAT!
echo ===============================================================================
echo Nhan phim bat ky de thoat...
pause > nul
