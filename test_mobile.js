const { chromium } = require('playwright-core');

const BASE = 'https://novaflow-ai-site.vercel.app/';

const devices = [
  { name: 'iPhone 14 (390x844)', width: 390, height: 844, mobile: true },
  { name: 'Android Pixel 7 (412x915)', width: 412, height: 915, mobile: true },
  { name: 'Tablette iPad (768x1024)', width: 768, height: 1024, mobile: false },
  { name: 'Desktop (1440x900)', width: 1440, height: 900, mobile: false },
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--disable-software-rasterizer', '--font-render-hinting=none'],
  });
  let allOk = true;

  for (const dev of devices) {
    const ctx = await browser.newContext({
      viewport: { width: dev.width, height: dev.height },
      isMobile: dev.mobile,
      hasTouch: dev.mobile,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text().slice(0, 150)); });
    page.on('pageerror', (err) => errors.push('PAGEERROR: ' + err.message.slice(0, 150)));

    try {
      await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(1500);

      const checks = await page.evaluate(() => {
        const ids = ['a-propos', 'services', 'comment-ca-marche', 'roi', 'simulateur', 'tarifs', 'preuve-sociale', 'contact'];
        const found = {};
        ids.forEach((id) => { found[id] = !!document.getElementById(id); });
        const doc = document.documentElement;
        return {
          title: document.title,
          sections: found,
          overflowX: doc.scrollWidth - window.innerWidth,
          scrollW: doc.scrollWidth,
          innerW: window.innerWidth,
          chatBtn: !!document.querySelector('button[aria-label*="Ouvrir"]'),
          portalBtn: [...document.querySelectorAll('button')].some((b) => b.textContent.includes('Espace Client')),
        };
      });

      const hasOverflow = checks.overflowX > 5;
      const missingSections = Object.entries(checks.sections).filter(([, v]) => !v).map(([k]) => k);
      console.log(`\n=== ${dev.name} ===`);
      console.log(`  Titre: ${checks.title.slice(0, 40)}`);
      console.log(`  Largeur: ${checks.innerW}px, scrollWidth: ${checks.scrollW}px (overflow: ${checks.overflowX}px) ${hasOverflow ? '❌ OVERFLOW!' : '✓'}`);
      console.log(`  Sections manquantes: ${missingSections.length ? '❌ ' + missingSections.join(', ') : 'aucune ✓'}`);
      console.log(`  Chatbot: ${checks.chatBtn ? '✓' : '❌'} | Espace Client: ${checks.portalBtn ? '✓' : '❌'}`);
      console.log(`  Erreurs console: ${errors.length ? errors.slice(0, 3).join(' | ') : 'aucune ✓'}`);
      if (hasOverflow || missingSections.length || errors.length) allOk = false;

      // Interaction test
      if (dev.mobile) {
        await page.click('button[aria-label*="Ouvrir"]', { timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(600);
        const chatOpen = await page.evaluate(() => document.body.innerText.includes('Assistant NovaFlow'));
        console.log(`  Chatbot s'ouvre: ${chatOpen ? '✓' : '❌'}`);
        if (!chatOpen) allOk = false;
      }

      // Screenshot with shorter timeout
      await page.screenshot({ path: `/tmp/shoot_${dev.name.replace(/[^a-z0-9]/gi, '_')}.png`, timeout: 15000 }).catch(() => {
        console.log('  (screenshot ignoré — timeout)');
      });
    } catch (e) {
      console.log(`\n=== ${dev.name} === ERREUR: ${e.message.slice(0, 200)}`);
      allOk = false;
    }
    await ctx.close();
  }

  await browser.close();
  console.log(`\n${allOk ? '✅ TOUS LES TESTS PASSENT' : '❌ DES PROBLÈMES DÉTECTÉS'}`);
  process.exit(allOk ? 0 : 1);
})();