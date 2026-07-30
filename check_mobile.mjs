import { chromium } from 'playwright-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Users\\hrava\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe';
const browser = await chromium.launch({ executablePath: CHROME_PATH });

const viewports = [
  { name: 'mobile-320', width: 320, height: 800 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });

    // Check for layout overflow
    const overflowIssues = await page.evaluate(() => {
      const issues = [];
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        if (el.scrollWidth > el.clientWidth && el !== document.documentElement && el !== document.body) {
          issues.push({
            tag: el.tagName,
            class: el.className,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          });
        }
      });
      return issues;
    });

    if (overflowIssues.length > 0) {
      console.log(`\n❌ OVERFLOW ISSUES at ${vp.name}:`);
      overflowIssues.slice(0, 5).forEach(issue => {
        console.log(`  ${issue.tag}.${issue.class}: overflow ${issue.scrollWidth - issue.clientWidth}px`);
      });
    } else {
      console.log(`✅ ${vp.name}: No overflow issues`);
    }

    // Check viewport meta tag
    const hasViewportMeta = await page.evaluate(() =>
      document.querySelector('meta[name="viewport"]')?.getAttribute('content')
    );
    console.log(`   Viewport meta: ${hasViewportMeta}`);

    // Get console errors/warnings
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.screenshot({ path: `/tmp/mobile-${vp.name}.png` });
    console.log(`   Screenshot: /tmp/mobile-${vp.name}.png`);

  } catch (e) {
    console.error(`Error at ${vp.name}:`, e.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('\nMobile check complete!');
