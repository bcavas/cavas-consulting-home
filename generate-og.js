const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, 'og-image.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 15000 });

  // Small wait for fonts and animations to settle
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.resolve(__dirname, 'og-image.png'),
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });

  await browser.close();
  console.log('og-image.png generated at 1200x630 (2x retina)');
})();
