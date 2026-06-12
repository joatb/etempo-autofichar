# 🕒 Sistema Automatizado de Fichaje (etempo_fichar)

Este proyecto automatiza el control horario diario (mañana y tarde) en Fedora utilizando **Playwright (Node.js)** y servicios de usuario de **systemd**. El sistema está diseñado para ser ultra-eficiente: se ejecuta exactamente a las horas programadas o, si el ordenador estaba apagado, lo hace inmediatamente al encenderlo ("lo antes posible").

---

## 🗺️ Mapa de Archivos (¿Dónde va cada cosa?)

Para que el sistema funcione, los archivos deben estar colocados exactamente en las siguientes rutas de tu directorio de usuario:

| Archivo | Ruta Completa | Función |
| :--- | :--- | :--- |
| **Script Lanzador** | `~/.local/bin/etempo_fichar.sh` | Espera al Wi-Fi, carga el entorno gráfico e inicia el script de Node según la hora. |
| **Servicio Systemd** | `~/.config/systemd/user/etempo_fichar.service` | Define cómo se ejecuta el script de Bash como un proceso del sistema. |
| **Temporizador** | `~/.config/systemd/user/etempo_fichar.timer` | Configura las alarmas de ejecución (08:00 y 16:00) y la persistencia. |

> 💡 *Nota: Si la carpeta `~/.config/systemd/user/` no existía en tu Fedora, se crea con el comando `mkdir -p ~/.config/systemd/user/`.*

---

## ⚙️ Contenido y Configuración de los Archivos

### 1. El Script Lanzador (`~/.local/bin/etempo_fichar.sh`)
Este script actúa como intermediario. Asegura las condiciones necesarias para que Playwright pueda abrir el navegador visualmente en segundo plano.
