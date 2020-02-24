"use strict";
const puppeteer = require("puppeteer");

const [url, path, size, delay = 0] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: parseInt(size.split("/")[0]),
    height: parseInt(size.split("/")[1])
  });

  await page.goto(url);

  await page.waitFor(parseInt(delay));

  await page.screenshot({ path, type: "png" });

  await browser.close();
})();
