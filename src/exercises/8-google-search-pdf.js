"use strict";
const puppeteer = require("puppeteer");

const [search] = process.argv.slice(2);

(async () => {
  // Importante tener headless a true para hacer pdf
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto("http://localhost:8083");

  await page.keyboard.type(search);
  await page.keyboard.press("Enter");

  await page.waitFor(2000);

  await page.pdf({
    path: search + "-google-search.pdf"
  });

  await page.close();
  await browser.close();
})();
