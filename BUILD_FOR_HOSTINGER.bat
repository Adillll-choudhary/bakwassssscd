@echo off
setlocal enabledelayedexpansion

echo ==============================================
echo COLDUNE STUDIO - ULTIMATE CLEANER AND BUILDER
echo ==============================================
echo.

echo [1/7] Deep Cleaning Workspace
rem Removing Debug Logs
del /q err.txt 2>nul
del /q errors.txt 2>nul
del /q eslint_errors.txt 2>nul
del /q lint.txt 2>nul
del /q lint_output.txt 2>nul
del /q ts.txt 2>nul
del /q ts_errors.txt 2>nul
del /q temp_bg_list.csv 2>nul

rem Removing Bulk Files
if exist site_2.zip (
    echo Deleting massive ZIP (site_2.zip)
    del /f /q site_2.zip 2>nul
)

rem Removing Backup Folders
if exist backup_old rmdir /s /q backup_old 2>nul
if exist backup_redesign rmdir /s /q backup_redesign 2>nul
if exist inputs rmdir /s /q inputs 2>nul
if exist outputs rmdir /s /q outputs 2>nul

rem Removing old build caches
if exist .next rmdir /s /q .next 2>nul
if exist out rmdir /s /q out 2>nul
echo Workspace Cleaned.
echo.

echo [2/7] Pre-Optimizing Assets (WebP Engine)
node convert-to-webp.mjs
node optimize-images.mjs
echo.

echo [3/7] Running Production Build (Next.js)
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Build failed! Check your code for errors.
    pause
    exit /b %errorlevel%
)
echo.

echo [4/7] Purging Redundant Static Assets from Build
echo Removing heavy PNGs from 'out' directory
for /r "out" %%F in (*.png) do (
    if exist "%%~dpnF.webp" (
        del /f /q "%%F" 2>nul
    ) else if exist "%%F.webp" (
        del /f /q "%%F" 2>nul
    )
)
if exist out\*.txt del /s /q out\*.txt 2>nul
if exist out\__next* del /s /q out\__next* 2>nul
echo.

echo [5/7] Finalizing Deployment Structure
if exist FINAL_BUILD rmdir /s /q FINAL_BUILD 2>nul
mkdir FINAL_BUILD
xcopy /e /y /i out FINAL_BUILD > nul
echo.

echo [6/7] Post-Build Cleanup
echo Finishing up
echo.

echo [7/7] Build Verification
if exist FINAL_BUILD\index.html (
    echo SUCCESS: Project cleaned and FINAL_BUILD is ready!
    echo -----------------------------------------------------------
    echo PERFORMANCE STATS:
    echo - Genesis Content: Updated Image (IMG_4657)
    echo - Particle Count: 10,000 (Optimized)
    echo - Massive ZIPs: Removed
    echo -----------------------------------------------------------
    echo ACTION: Upload all contents of 'FINAL_BUILD' to Hostinger.
) else (
    echo WARNING: Build might have failed. index.html missing.
)

pause
