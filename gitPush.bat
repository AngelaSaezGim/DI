@echo off
:: Cambia al directorio del repositorio
cd /d "C:\Users\angel\OneDrive\Escritorio\DAM\DIM"

:: Agrega todos los cambios al área de preparación
git add .

:: Realiza un commit con un mensaje predefinido
git commit -m "Actualización automática desde script"

:: Sube los cambios a la rama remota
git push origin main

:: Mensaje final
echo Push completado con éxito.
pause
