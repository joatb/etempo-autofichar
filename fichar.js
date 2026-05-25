require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = process.env.ETEMPO_URL;
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const LOG_FILE = path.join(__dirname, 'fichar.log');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

const SENTIDOS = { entrada: '2', salida: '3' };
const INCIDENCIAS = { teletrabajo: '234' };

function parseArgs() {
  const args = process.argv.slice(2);
  const tipo = args.find(a => a === 'entrada' || a === 'salida');
  const teletrabajo = args.includes('teletrabajo');

  if (!tipo) {
    console.error('Uso: node fichar.js <entrada|salida> [teletrabajo]');
    process.exit(1);
  }
  return { tipo, teletrabajo };
}

async function screenshot(page, name) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  const file = path.join(SCREENSHOTS_DIR, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
}

async function login(page) {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.fill('#txtUsername', process.env.ETEMPO_USER);
  await page.fill('#MainContent_txtPassword', process.env.ETEMPO_PASS);
  await page.click('#btnEntrar');
  await page.waitForLoadState('networkidle');
}

(async () => {
  const { tipo, teletrabajo } = parseArgs();
  fs.writeFileSync(LOG_FILE, '');
  log(`Fichando: ${tipo}${teletrabajo ? ' (teletrabajo)' : ''}`);

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  try {
    await login(page);
    log('Login correcto.');

    await page.locator('a[href*="MarcarMovimiento.aspx"]').click();
    await page.waitForURL('**/MarcarMovimiento.aspx', { timeout: 15000 });
    log('En página de fichaje.');

    await page.selectOption('#MainContent_dropSentidos', SENTIDOS[tipo]);

    if (teletrabajo) {
      await page.selectOption('#MainContent_dropIncidencias', INCIDENCIAS.teletrabajo);
    }

    await page.click('#MainContent_btnGuardar');
    await page.waitForLoadState('networkidle');

    log(`Fichaje de ${tipo} registrado correctamente.`);
  } catch (err) {
    log(`Error: ${err.message}`);
    await screenshot(page, 'error');
  } finally {
    await browser.close();
  }
})();
