"use strict";
const puppeteer = require("puppeteer");

const [url] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const html = await page.evaluate(() => document.body.innerHTML);

  process.argv
    .slice(3)
    .sort()
    .map(arg => {
      const matches = html.match(new RegExp(arg, "gi"));
      console.log(`"${arg}" is used ${matches ? matches.length : 0} times.`);
    });

  await browser.close();
})();
