@echo off
::==============================================================================
:: Script Name:   setup_crontab_startup.bat
:: Description:   Adds crontab.exe to Windows startup as a process.
:: Author:       Dmitry Troshenkov
:: Date:         2025-04-08
:: Version:      1.0
::==============================================================================
:: HOW TO GET CRONTAB.EXE:
:: - You can download a Windows-compatible crontab implementation from:
::   https://github.com/karlheyes/cron (or another reliable source).
:: - Alternatively, install a Unix-like environment for Windows such as:
::   - Cygwin (https://www.cygwin.com/)
::   - WSL (Windows Subsystem for Linux)
:: - Place `crontab.exe` in a permanent directory (e.g., C:\Tools\crontab.exe).
::
:: HOW TO USE:
:: - Run this script to add `crontab.exe` to the Windows startup folder.
:: - The script creates a shortcut in:
::   %APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup
:: - This ensures crontab.exe starts automatically when you log in.
:: - To remove it, delete the shortcut from the Startup folder.
::==============================================================================

setlocal

:: Define the path to crontab.exe (Update this path as needed)
set CRONTAB_EXE="C:\Tools\crontab.exe"

:: Define the startup folder path
set STARTUP_FOLDER="%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

:: Define the shortcut name
set SHORTCUT_NAME="Crontab.lnk"

:: Check if the shortcut exists
if not exist "%STARTUP_FOLDER%\%SHORTCUT_NAME%" (
    echo Creating startup shortcut for crontab...
    powershell -Command "$s=(New-Object -COM WScript.Shell).CreateShortcut('%STARTUP_FOLDER%\%SHORTCUT_NAME%'); $s.TargetPath=%CRONTAB_EXE%; $s.Save()"
    echo Shortcut created successfully.
) else (
    echo Shortcut already exists.
)

:: Optional: Uncomment to add it as a scheduled task instead
::schtasks /create /tn "CrontabTask" /tr %CRONTAB_EXE% /sc onlogon /rl highest

endlocal
exit /b 0