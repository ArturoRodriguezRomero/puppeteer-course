"use strict";
const puppeteer = require("puppeteer");

const [
  target = "https://en.wikipedia.org/wiki/Software",
  ...hints
] = process.argv.slice(2);
const help = [target, ...hints];
const wikipedia = "https://en.wikipedia.org/wiki/Main_Page";
const history = [];

const isWikipediaInternalLink = url => {
  return url.split(":").length > 2;
};

const getRandomLink = async urls => {
  const random = Math.floor(Math.random() * (urls.length - 1));
  const target = urls[random];

  if (target === undefined) return history[history.length - 2];

  let url = target;

  return url;
};

const getHelpfulLink = async urls => {
  const helpLowerCase = help.map(help => help.toLowerCase());
  const urlsLowerCase = urls.map(url => url.toLowerCase());

  const helpful = urlsLowerCase.filter(
    url => helpLowerCase.filter(help => url.includes(help)).length > 0
  );

  console.log("Useful", helpful[0] !== undefined);

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

  while (page.url().toLowerCase() !== target.toLowerCase()) {
    const links = await page.$$('#content a[href^="/wiki"]');
    const urls = await Promise.all(
      links.map(link => link.evaluate(link => link.href))
    );

    const valuableUrls = urls.filter(url => !isWikipediaInternalLink(url));

    const randomLink = await getRandomLink(valuableUrls);
    const helpfulLink = await getHelpfulLink(valuableUrls);

    const isStuck =
      history.length > 2 &&
      history[history.length - 1] === history[history.length - 3];

    console.log("Stuck", isStuck);

    const url = helpfulLink && !isStuck ? helpfulLink : randomLink;

    history.push(url);
    console.log(history.length + 1 + " - " + url);
    console.log("-------------");

    await page.goto(url);
  }

  await page.evaluate(() => alert("VICTORY"));
})();
