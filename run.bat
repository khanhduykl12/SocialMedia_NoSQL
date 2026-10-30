@echo off
chcp 65001 > nul
title MANG XA HOI NOSQL - HUIT

cd /d "%~dp0"

echo ===============================================================================
echo   DO AN: MANG XA HOI VA PHAN HE GOI Y KET BAN (HUIT)
echo   CSDL: MongoDB + Neo4j Graph Database
echo ===============================================================================
echo.

echo [1/3] Kiem tra Docker Database...
docker info >nul 2>&1
if errorlevel 1 (
    echo [Luu y] Docker Desktop chua duoc bat hoac chua khoi dong.
    echo         He thong se su dung MongoDB va Neo4j dang chay tren may.
) else (
    echo [OK] Docker dang chay, dang khoi dong containers MongoDB va Neo4j...
    docker compose up -d
)

echo.
echo [2/3] Dang khoi chay Backend Server tren Port 5000...
start "NoSQL-Backend-Port-5000" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo.
echo [3/3] Dang khoi chay Frontend Web React tren Port 5173...
start "NoSQL-Frontend-Port-5173" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Dang mo trinh duyet den http://localhost:5173...
ping 127.0.0.1 -n 4 > nul
start http://localhost:5173

echo.
echo ===============================================================================
echo   DA KHOI CHAY HE THONG THANH CONG!
echo ===============================================================================
echo   - Frontend Web:  http://localhost:5173
echo   - Backend API:   http://localhost:5000/api
echo   - Neo4j Browser: http://localhost:7474 (user: neo4j / pass: password123)
echo ===============================================================================
echo.
echo Backend va Frontend dang chay trong 2 cua so rieng biet de ban de quan sat log.
echo Nhan phim bat ky de dong cua so nay...
pause > nul
