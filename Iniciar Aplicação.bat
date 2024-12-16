@echo off
echo Iniciando FlowPay Atendimento...
echo.
echo Iniciando Backend e Frontend...

start cmd /k "cd backend && mvn spring-boot:run"
timeout /t 5
start cmd /k "npm run dev"

echo.
echo Aguardando os servicos iniciarem...
timeout /t 10

echo Abrindo aplicacao no navegador...
start http://localhost:3000

echo.
echo Aplicacao iniciada! 
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000 