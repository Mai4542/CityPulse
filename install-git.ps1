$ErrorActionPreference = 'Stop'
$gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe"
$installerPath = "$env:TEMP\git-installer.exe"

Write-Host "Downloading Git..."
Invoke-WebRequest -Uri $gitUrl -OutFile $installerPath

Write-Host "Installing Git silently..."
Start-Process -FilePath $installerPath -ArgumentList "/VERYSILENT", "/NORESTART", "/NOCANCEL", "/SP-", "/SUPPRESSMSGBOXES" -Wait

Write-Host "Git installation finished."
