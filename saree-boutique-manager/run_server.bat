@echo off
title AIMIT Saree Boutique Manager Launcher
echo ==========================================================
echo  AIMIT Saree Boutique Manager Launcher
echo ==========================================================
echo.
echo  Starting local file database server...
echo  Launching browser at http://localhost:8000
echo.

:: Launch the default web browser in the background
start http://localhost:8000/

:: Launch the PowerShell HttpListener backend
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start the server. 
    echo Please make sure Windows PowerShell is enabled and port 8000 is free.
    echo.
    pause
)
