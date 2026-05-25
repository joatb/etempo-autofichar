# etempo-fichar

Script Node.js con Playwright para automatizar el fichaje en [eTempo].

## Instalación

```bash
npm install
npx playwright install chromium
```

Copia el fichero de ejemplo y rellena tus credenciales:

```bash
cp .env.example .env
```

## Uso

```bash
node fichar.js <entrada|salida> [teletrabajo]
```

### Ejemplos

```bash
node fichar.js entrada
node fichar.js salida
node fichar.js entrada teletrabajo
node fichar.js salida teletrabajo
```

## Aliases (zsh)

```zsh
alias fichar-entrada='node /ruta/al/repo/fichar.js entrada'
alias fichar-salida='node /ruta/al/repo/fichar.js salida'
alias fichar-entrada-tele='node /ruta/al/repo/fichar.js entrada teletrabajo'
alias fichar-salida-tele='node /ruta/al/repo/fichar.js salida teletrabajo'
```

## Logs

Cada ejecución sobreescribe `fichar.log` con el resultado.
