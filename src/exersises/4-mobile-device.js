"use strict";
const puppeteer = require("puppeteer");

const [url, path, device = "Nexus 10", delay = 0] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.setViewport(puppeteer.devices[device].viewport);

  await page.goto(url);

  await page.waitFor(parseInt(delay));

  await page.screenshot({ path, type: "png" });

  await browser.close();
})();
