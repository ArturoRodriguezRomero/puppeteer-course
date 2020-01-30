describe("Todo Page Flow", () => {
  const url = "http://127.0.0.1:8080/";
  

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();
    await page.goto(url);
  });

  afterEach(async () => {
    await page.close();
    await browser.close();
  });

  test("create a new todo", () => {
    const given = "new todo"
    await page.createTodo(given)
  });
});
