const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
  const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const page = await ctx.newPage();
  await page.goto('https://novaflow-ai-site.vercel.app/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(2000);
  // Trouver les éléments qui dépassent
  const offenders = await page.evaluate(() => {
    const vw = window.innerWidth;
    const bad = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0) {
        bad.push({ tag: el.tagName, cls: (el.className && el.className.toString().slice(0, 80)) || '', id: el.id, right: Math.round(r.right), left: Math.round(r.left), w: Math.round(r.width) });
      }
    });
    // dedupe
    const seen = new Set();
    return bad.filter((b) => { const k = b.tag + b.cls; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 20);
  });
  console.log('ÉLÉMENTS QUI DÉPASSENT:', JSON.stringify(offenders, null, 2));
  await browser.close();
})();