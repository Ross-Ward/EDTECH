@echo off

:: Creating Folders
if not exist "%~dp0User\ProgramData" mkdir "%~dp0User\ProgramData"
if not exist "%~dp0User\Public" mkdir "%~dp0User\Public"
if not exist "%~dp0User\AppData\Roaming" mkdir "%~dp0User\AppData\Roaming"
if not exist "%~dp0User\Documents" mkdir "%~dp0User\Documents"
if not exist "%~dp0User\AppData\Local\Temp" mkdir "%~dp0User\AppData\Local\Temp"

:: Setting Env Variables
set ALLUSERSPROFILE=%~dp0User\ProgramData\Roaming
set APPDATA=%~dp0User\AppData
set LOCALAPPDATA=%~dp0User\AppData\Local
set HOMEPATH=%~dp0User
set ProgramData=%~dp0User\ProgramData
set Public=%~dp0User\Public
set TEMP=%~dp0User\AppData\Local\Temp
set TMP=%~dp0User\AppData\Local\Temp
set USERPROFILE=%~dp0User

:: if not exist "%dp0User\Documents\Obsidian" goto message
goto message
goto start

:message
echo PORTABLE Obsidian
echo -------------------------------
pause 

:start
start Obsidian.exe