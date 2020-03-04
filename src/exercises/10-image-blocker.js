"use strict";
const puppeteer = require("puppeteer");

const [url] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1280,
      height: 720
    }
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on("request", request => {
    const isImage = ["image", "media"].includes(request.resourceType());

    if (isImage) {
      request.abort();
    } else {
      request.continue();
    }
  });

  page.on("close", async () => {
    await browser.close();
  });

  await page.goto(url);
})();
