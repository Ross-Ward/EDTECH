# How to Install Obsidian On External Device (Windows Only)

## Instructions

Unfortunately, this method only works for Windows. If I find a method for MacOs and Linux, I will update this guide accordingly.

1. Download Obsidian.exe from their website [here](https://obsidian.md).
2. Extract the file to a folder in you external device (USB, SD card).
	- _**Tip:** 7zip works well for extracting .exe files. It's [free](https://www.7-zip.org) too!_
3. Move the ObsidianLauncher.bat file in the same folder as PLUGINSDIR in what was extracted.
	- **Note:** I didn't write this. The original source I found this was on the Obsidian forums [here](https://forum.obsidian.md/t/run-in-portable-mode/915/23). Thank you Royi for sharing this.
4. Double click Obsidian.exe inside your external device.
5. Wait for Obsidian to launch. It might take a bit. Select a folder in your external device as your vault. Obsidian will remember this setting upon reopening next time.
6. Voilà! You can now take a portable version of Obsidian anywhere you go.

Hope this helps you in journey to building your personal knowledge management system!

## bat Code Explained

For the extra cautious or those who want to understand the line of codes, here it is! I've added comments briefly explaining what each block of code does.

*To prevent all commands in a batch file (including the **echo off** command) from displaying on the screen, on the first line of the batch file type:*
```
@echo off 
```

*Creating the folders to run Obsidian on your external device (if they don't exist):
```
:: Creating Folders 
if not exist "%~dp0User\ProgramData" mkdir "%~dp0User\ProgramData" 
if not exist "%~dp0User\Public" mkdir "%~dp0User\Public" 
if not exist "%~dp0User\AppData\Roaming" mkdir "%~dp0User\AppData\Roaming" 
if not exist "%~dp0User\Documents" mkdir "%~dp0User\Documents" 
if not exist "%~dp0User\AppData\Local\Temp" mkdir "%~dp0User\AppData\Local\Temp" 
```

*Set the environment variables and have them reference the files within the created folders just made or existing.*
```
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
```

*This is where the bat file executes using the ```goto``` command. This will take a few seconds, but afterwards Obsidian will launch with whatever settings you end up saving.*
```
:: if not exist "%dp0User\Documents\Obsidian" goto message 
goto message 
goto start :message echo PORTABLE Obsidian 
echo ------------------------------- 
pause 
:start 
start Obsidian.exe
```