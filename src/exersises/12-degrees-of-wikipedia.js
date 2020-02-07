"use strict";
const puppeteer = require("puppeteer");

const [target, ...hints] = process.argv.slice(2);
const help = [target, ...hints];
const wikipedia = "https://en.wikipedia.org/wiki/Main_Page";
const history = [];
let counter = 0;

const getRandomLink = async links => {
  const random = Math.floor(Math.random() * (links.length - 1));
  const target = links[random];

  if (target === undefined) return history[history.length - 2];

  let url = await target.evaluate(element => element.href);

  return url;
};

const getHelpfulLink = async links => {
  const urls = await Promise.all(
    links.map(link => link.evaluate(link => link.href))
  );

  const helpLowerCase = help.map(help => help.toLowerCase());
  const urlsLowerCase = urls.map(url => url.toLowerCase());

  const helpful = urlsLowerCase.filter(
    url => helpLowerCase.filter(help => url.includes(help)).length > 0
  );

  console.log("Found useful link", helpful[0]);

  return helpful[0];
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    defaultViewport: {
      width: 1280,
      height: 720
    }
  });

  const page = await browser.newPage();
  await page.goto(wikipedia);

  while (page.url() !== target) {
    const links = await page.$$('#content a[href^="/wiki"]');

    const randomLink = await getRandomLink(links);
    const helpfulLink = await getHelpfulLink(links);

    const isStuck =
      history.length > 2 &&
      history[history.length - 1] === history[history.length - 3];

    console.log("isStuck", isStuck);

    const url = helpfulLink && !isStuck ? helpfulLink : randomLink;

    history.push(url);
    console.log((counter += 1) + " - " + url);
    console.log("-------------");

    await page.goto(url);
  }

  await page.evaluate(() => alert("VICTORY"));
})();
