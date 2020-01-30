// Import puppeteer. (from node 13.7.0 up)
import puppeteer from "puppeteer";
// Alternative.
// const puppeteer = require("puppeteer")

// Get arguments.
const [url] = process.argv.slice(2);

(async () => {
  // Launch the browser.
  const browser = await puppeteer.launch();
  // Open a new page.
  const page = await browser.newPage();

  // Go to the given url
  await page.goto(url);

  // ✨ Magic code goes here... ✨

  // Close the browser. Kill the process.
  await page.close();
  await browser.close();
})();
