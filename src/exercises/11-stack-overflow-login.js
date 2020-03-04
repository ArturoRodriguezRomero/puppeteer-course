"use strict";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    defaultViewport: {
      width: 1280,
      height: 720
    }
  });
  const page = await browser.newPage();

  page.on("close", async () => {
    await browser.close();
  });

  // Google Search
  page.goto("http://localhost:8083");

  await page.waitFor(1000);

  await page.keyboard.type("stackoverldow");
  await page.keyboard.press("Enter");

  await page.waitForNavigation({waitUntil: "networkidle0"});

  for(let i = 0; i < 24; i++) {
    await page.keyboard.press("Tab");
  }

  await page.keyboard.press("Enter");

  // await page.waitForNavigation({waitUntil: "networkidle0"});

  // Login form
  const username = await page.$("[name=display-name]");
  const email = await page.$("[name=email]");
  const password = await page.$("[name=password]");

  await username.focus();
  await page.keyboard.type("username");

  await email.focus();
  await page.keyboard.type("email@google.com");

  await password.focus();
  await page.keyboard.type("password123");

  await page.keyboard.press("Enter");

  // We're in 🐱‍💻
})();
