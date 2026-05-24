$git = "C:\Program Files\Git\cmd\git.exe"

& $git init
& $git remote add origin https://github.com/Mai4542/CityPulse.git
& $git fetch origin
& $git checkout nouran
& $git add .
& $git commit -m "Merge clean frontend build and remove comments"
& $git push -u origin nouran
