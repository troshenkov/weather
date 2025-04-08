@echo off
::==============================================================================
:: Script Name:   manage_nginx_service.bat
:: Description:   Copies nginx.exe, installs, starts, stops, and uninstalls nginx as a Windows service.
:: Author:        Dmitry Troshenkov
:: Date:          2025-04-08
::==============================================================================
:: Steps:
:: 1. Copy nginx.exe to the parent directory.
:: 2. Install nginx as a Windows service.
:: 3. Start the nginx service.
:: 4. Stop the nginx service.
:: 5. Uninstall nginx service.

:: Check for help argument
if "%1"=="-h" goto help
if "%1"=="--help" goto help

setlocal

:: Define the path to nginx.exe and nginx_service.exe
set NGINX_EXE=nginx.exe
set NGINX_SERVICE_EXE=nginx_service.exe

:: Step 1: Copy nginx.exe to the parent directory
echo Copying nginx.exe to the parent directory...
copy /Y %NGINX_EXE% ..\

:: Check if nginx_service.exe exists
if not exist %NGINX_SERVICE_EXE% (
    echo nginx_service.exe not found. Make sure it is in the same directory as this script.
    exit /b 1
)

:: Step 2: Install nginx as a Windows service
echo Installing nginx as a service...
%NGINX_SERVICE_EXE% install
if errorlevel 1 (
    echo Failed to install nginx as a service.
    exit /b 1
)

:: Step 3: Start the nginx service
echo Starting nginx service...
%NGINX_SERVICE_EXE% start
if errorlevel 1 (
    echo Failed to start nginx service.
    exit /b 1
)

:: Step 4: Stop the nginx service (Optional, can be executed manually if needed)
echo Stopping nginx service...
%NGINX_SERVICE_EXE% stop
if errorlevel 1 (
    echo Failed to stop nginx service.
    exit /b 1
)

:: Step 5: Uninstall nginx service (Optional, can be executed manually if needed)
echo Uninstalling nginx service...
%NGINX_SERVICE_EXE% uninstall
if errorlevel 1 (
    echo Failed to uninstall nginx service.
    exit /b 1
)

endlocal
exit /b 0

:: Help Section
:help
echo.
echo ========================================================================
echo Script Name: manage_nginx_service.bat
echo ========================================================================
echo This script helps to manage the Nginx service on Windows:
echo.
echo Usage:
echo   manage_nginx_service.bat [options]
echo.
echo Options:
echo   -h, --help          Display this help message.
echo.
echo Steps performed by the script:
echo   1. Copies nginx.exe to the parent directory.
echo   2. Installs nginx as a Windows service.
echo   3. Starts the nginx service.
echo   4. Stops the nginx service (Optional, can be run manually).
echo   5. Uninstalls the nginx service (Optional, can be run manually).
echo.
echo Requirements:
echo   - nginx.exe and nginx_service.exe should be in the same directory.
echo.
echo ========================================================================
exit /b 0