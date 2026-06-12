#!/bin/bash

# 1. Esperar a que el Wi-Fi tenga conexión real a internet
while ! nmcli networking connectivity check | grep -q "full"; do
    sleep 2
done

# 2. Exportar entorno gráfico para que Playwright pueda abrir el navegador visible
export DISPLAY=:0
export XDG_RUNTIME_DIR=/run/user/$(id -u)

# 5. Detectar la hora actual (formato 24h)
HORA_ACTUAL=$(date +%H)

# 6. Decidir qué comando usar según la hora
if [ "$HORA_ACTUAL" -ge 05 ] && [ "$HORA_ACTUAL" -lt 12 ]; then
    # RANGO MAÑANA: Si el PC se enciende o da la hora entre las 05:00 y las 11:59
    echo "[$(date)] Iniciando tarea de la MAÑANA..."
    
    # Pon aquí tu comando de la mañana:
    node /home/jtorrents/DEV/_personal/etempo/fichar.js entrada teletrabajo

else
    # RANGO TARDE: Para la ejecución de las 16:00 (o si enciendes el PC por la tarde)
    echo "[$(date)] Iniciando tarea de la TARDE..."
    
    # Pon aquí tu comando de la tarde:
    node /home/jtorrents/DEV/_personal/etempo/fichar.js salida teletrabajo
fi
