"use strict";

const { TodoFlow } = require("./todo-flow");
const { TodoPage } = require("./todo-page");

describe("Todo Page Flow", () => {
  test("create a new todo", async done => {
    const { flow, page } = await setup();
    const given = "new todo";

    await flow.createTodo(given);
    const todos = await page.getTodos();

    expect(todos.length).toBe(1);
    expect(todos[0]).toBe(given);

    done();
  });

  test("edit a todo", async done => {
    const { flow, page } = await setup();
    const given = { initial: "initial", edited: "edited" };

    await flow.createTodo(given.initial);
    await flow.editTodo(0, given.edited);

    const todos = await page.getTodos();

    expect(todos[0]).toBe(given.edited);

    done();
  });

  test("complete a todo", async done => {
    const { flow, page } = await setup();

    await flow.createTodo("new todo");
    await flow.toggleTodo(0);

    const completed = await page.getCompletedTodos();

    expect(completed.length).toBe(1);

    done();
  });

  test("un-complete a todo", async done => {
    const { flow, page } = await setup();

    await flow.createTodo("new todo");
    await flow.toggleTodo(0);
    await flow.toggleTodo(0);
    5;
    const completed = await page.getCompletedTodos();

    expect(completed.length).toBe(0);

    done();
  });

  test("complete all", async done => {
    const { flow, page } = await setup();

    await flow.createTodo("new todo 1");
    await flow.createTodo("new todo 2");
    await flow.createTodo("new todo 3");

    await flow.toggleAll();

    const completed = await page.getCompletedTodos();

    expect(completed.length).toBe(3);

    done();
  });

  test("uncompleted label updates", async done => {
    const { flow, page } = await setup();

    await flow.createTodo("new todo 1");
    await flow.createTodo("new todo 2");
    await flow.createTodo("new todo 3");

    await flow.toggleTodo(1);

    const completed = await page.getTodoCount();

    expect(completed).toBe("2 items left");

    done();
  });

  test("filter by active", async done => {
    const { flow, page } = await setup();

    await flow.createTodo("new todo 1");
    await flow.createTodo("new todo 2");
    await flow.createTodo("new todo 3");
    await flow.toggleTodo(1);

    await flow.filterActive();
    const active = await page.getTodos();

    expect(active.length).toBe(2);

    done();
  });

  test("filter by complete", async done => {
    const { flow, page } = await setup();

    await flow.createTodo("new todo 1");
    await flow.createTodo("new todo 2");
    await flow.createTodo("new todo 3");
    await flow.toggleTodo(1);

    await flow.filterCompleted();
    const active = await page.getTodos();

    expect(active.length).toBe(1);

    done();
  });

  test("clear completed", async done => {
    const { flow, page } = await setup();

    await flow.createTodo("new todo 1");
    await flow.createTodo("new todo 2");
    await flow.createTodo("new todo 3");
    await flow.toggleTodo(1);

    await flow.clearCompleted();
    const todos = await page.getTodos();

    expect(todos.length).toBe(2);

    done();
  });
});

/**
 * @returns {{flow: TodoFlow, page: TodoPage}}
 */
const setup = async () => {
  const url = process.env.URL;

  await page.goto(url);

  await page.evaluate(() => {
    localStorage.clear();
  });

  await page.goto(url);

  const todoPage = new TodoPage(page);
  const todoFlow = new TodoFlow(todoPage);

  return {
    page: todoPage,
    flow: todoFlow
  };
};
