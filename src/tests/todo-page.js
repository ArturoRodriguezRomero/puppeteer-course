"use strict";

const { Page } = require("puppeteer/lib/Page");

class TodoPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.selectors = {
      input: ".new-todo",
      items: ".todo-list li",
      labels: ".todo-list li .view label",
      completedLabels: ".todo-list li.completed",
      item: index => `.todo-list li:nth-child(${index + 1})`,
      toggle: index => `.todo-list li:nth-child(${index + 1}) .view .toggle`,
      remove: index => `.todo-list li:nth-child(${index + 1}) .view .destroy`,
      filterActive: 'a[href="#/active"]',
      filterCompleted: 'a[href="#/completed"]',
      clearCompleted: ".clear-completed",
      clearFilter: 'a[href="#/"]'
    };
  }

  async focusInput() {
    this.page.focus(this.selectors.input);
  }

  async type(text) {
    await this.page.keyboard.type(text);
  }

  async enter() {
    await this.page.keyboard.press("Enter");
  }

  async hover(index) {
    this.page.hover(this.selectors.item(index));
  }

  async edit(index) {
    this.page.click(this.selectors.item(index), { clickCount: 2 });
  }

  async clear() {
    // Not MacOS 🍎😞
    // await this.page.keyboard.down("Control");
    // await this.page.keyboard.press("A");
    // await this.page.keyboard.up("Control");
    // await this.page.keyboard.press("Backspace");

    for (let i = 0; i < 20; i++) {
      await this.page.keyboard.press("Backspace");
    }
  }

  async delete(index) {
    const remove = await this.page.$(this.selectors.remove(index));
    await remove.click();
  }

  async toggle(index) {
    const toggle = await this.page.$(this.selectors.toggle(index));
    await toggle.click();
  }

  async filterActive() {
    const filter = await this.page.$(this.selectors.filterActive);
    await filter.click();
  }

  async filterCompleted() {
    const filter = await this.page.$(this.selectors.filterCompleted);
    await filter.click();
  }

  async clearFilter() {
    const clear = await this.page.$(this.selectors.clearFilter);
    await clear.click();
  }

  async getTodos() {
    return await page.$$eval(this.selectors.labels, todos =>
      todos.map(todo => todo.textContent)
    );
  }

  async getCompletedTodos() {
    return await page.$$eval(this.selectors.completedLabels, todos =>
      todos.map(todo => todo.textContent)
    );
  }

  async wait(time) {
    await this.page.waitFor(time);
  }
}

module.exports.TodoPage = TodoPage;
