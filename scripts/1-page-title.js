("use strict");

import puppeteer from "puppeteer";

const [url] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const title = await page.title();
  console.log("Page title: " + title);

  await browser.close();
})();
