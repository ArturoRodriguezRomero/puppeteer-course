import puppeteer from "puppeteer";

const [url] = process.argv.slice(2);

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
  page.goto("https://google.com");

  await page.waitFor(1000);

  await page.keyboard.type("isntag");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");

  await page.waitFor(1000);

  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");

  await page.waitFor(1000);

  // Login link
  const result = await page.$x(`//a[contains(text(), "Inicia sesión")]`);
  const loginLink = result[0];

  await loginLink.click();

  await page.waitFor(1000);

  // Login form
  const username = await page.$("[name=username]");
  const password = await page.$("[name=password]");

  await username.focus();
  await page.keyboard.type("username");

  await password.focus();
  await page.keyboard.type("password");
  await page.keyboard.press("Enter");

  // We're in 🐱‍💻

  await page.goto(url);
})();
