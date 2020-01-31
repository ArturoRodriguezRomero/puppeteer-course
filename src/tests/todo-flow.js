"use strict";

const { TodoPage } = require("./todo-page");

class TodoFlow {
  /**
   * @param {TodoPage} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * @param {string} text
   */
  async createTodo(text) {
    this.page.focusInput();
    await this.page.type(text);
    await this.page.enter();
  }

  /**
   * @param {number} index
   * @param {string} text
   */
  async editTodo(index, text) {
    await this.page.hover(index);
    await this.page.edit(index);
    await this.page.clear();
    await this.page.type(text);
    await this.page.enter();
  }

  /**
   * @param {number} index
   */
  async toggleTodo(index) {
    await this.page.toggle(index);
  }

  /**
   * @param {number} index
   */
  async removeTodo(index) {
    await this.page.hover(index);
    await this.page.wait(300);
    await this.page.delete(index);
  }

  /**
   * @returns {Promise<string[]>}
   */
  async getTodos() {
    const todos = await this.page.getTodos();
    return todos;
  }

  /**
   * @returns {Promise<string[]>}
   */
  async getCompletedTodos() {
    const todos = await this.page.getCompletedTodos();
    return todos;
  }

  async filterActive() {
    await this.page.filterActive();
  }

  async filterCompleted() {
    await this.page.filterCompleted();
  }

  async clearFilters() {
    await this.page.clearFilter();
  }
}

module.exports.TodoFlow = TodoFlow;
