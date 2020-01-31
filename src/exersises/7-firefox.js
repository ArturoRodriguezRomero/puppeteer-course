"use strict";
const puppeteer = require("puppeteer");

const [url, selector] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 720 },
    product: "firefox",
    executablePath: "/Applications/Firefox Nightly.app/Contents/MacOS/firefox"
  });
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitFor(1000);

  await page.$$eval(selector, elements => {
    elements.map(element => {
      element.setAttribute("style", "background-color: yellow;");
    });
  });

  page.on("requestfinished", async () => {
    console.log("requestfinished");
    await page.$$eval(selector, elements => {
      elements.map(element => {
        element.setAttribute("style", "background-color: yellow;");
      });
    });
  });

  page.on("close", async () => {
    browser.close();
  });
})();
