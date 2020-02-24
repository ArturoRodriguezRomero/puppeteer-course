"use strict";
const puppeteer = require("puppeteer");

const [search] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1080,
      height: 1920
    }
  });
  const page = await browser.newPage();

  await page.goto("https://google.com");

  await page.keyboard.type(search);
  await page.keyboard.press("Enter");

  await page.waitFor(2000);

  await page.pdf({
    path: search + "-google-search.pdf"
  });

  await page.close();
  await browser.close();
})();
