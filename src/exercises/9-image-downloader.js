"use strict";
const puppeteer = require("puppeteer");
const fs = require("fs");

const [url = "https://google.com", project = "project"] = process.argv.slice(2);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1280, height: 720 }
  });
  const page = await browser.newPage();

  const responses = [];

  page.on("response", response => {
    responses.push(response);
  });

  page.on("load", async () => {
    const images = responses.filter(response =>
      response.url().match(/(https?:\/\/.*\.(?:png|jpg))/i)
      // o (mejor) ["image", "media"].includes(response.request().resourceType())
    );

    images.forEach(async (image, index) => {
      const buffer = await image.buffer();

      fs.writeFileSync("images/" + project + "-" + index + ".png", buffer);
    });
  });

  await page.goto(url, { waitUntil: "networkidle0" });

  await browser.close();
})();
