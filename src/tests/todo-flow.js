import { TodoPage } from "./todo-page";

export class TodoFlow {
  page = null;

  constructor(page = new TodoPage()) {
    this.page = page;
  }

  createTodo(text) {
    this.page
      .focusInput()
      .type(text)
      .enter();
  }

  editTodo(index, text) {
    this.page
      .hover(index)
      .edit()
      .clear()
      .type(text)
      .enter();
  }
}
