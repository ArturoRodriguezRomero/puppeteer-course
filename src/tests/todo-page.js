export class TodoPage {
  selectors = {
    input: ".new-todo",
    todos: ".todo-list li",
    toggle: ".toggle",
    filterActive: 'a[href="#/active"]',
    filterCompleted: 'a[href="#/completed"]',
    clearFilter: ".clear-completed"
  };

  constructor(page) {}

  focusInput() {
    page;
    return this;
  }

  type(text) {
    return this;
  }

  enter() {
    return this;
  }

  hover(index) {
    return this;
  }

  edit() {
    return this;
  }

  clear() {
    return this;
  }

  delete() {
    return this;
  }

  toggle(index) {
    return this;
  }

  filterActive() {
    return this;
  }

  filterCompleted() {
    return this;
  }

  clearFilter() {
    return this;
  }
}
