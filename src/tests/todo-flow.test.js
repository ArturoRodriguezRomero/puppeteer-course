"use strict";

const { TodoFlow } = require("./todo-flow");
const { TodoPage } = require("./todo-page");

describe("Todo Page Flow", () => {
  test("create a new todo", async done => {
    const { flow } = await setup();
    const given = "new todo";

    await flow.createTodo(given);
    const todos = await flow.getTodos();

    expect(todos.length).toBe(1);
    expect(todos[0]).toBe(given);

    await teardown(flow);
    done();
  }, 30000);

  test("edit a todo", async done => {
    const { flow } = await setup();
    const given = { initial: "initial", edited: "edited" };

    await flow.createTodo(given.initial);
    await flow.editTodo(0, given.edited);

    const todos = await flow.getTodos();

    expect(todos[0]).toBe(given.edited);

    await teardown(flow);
    done();
  }, 30000);

  test("toggle a todo", async done => {
    const { flow } = await setup();

    await flow.createTodo("new todo");
    await flow.toggleTodo(0);

    const completed = await flow.getCompletedTodos();

    expect(completed.length).toBe(1);

    await teardown(flow);
    done();
  }, 30000);
});

/**
 * @returns {{flow: TodoFlow}}
 */
const setup = async () => {
  const url = "http://127.0.0.1:8080/";

  await page.goto(url);

  const flow = new TodoFlow(new TodoPage(page));
  return {
    flow
  };
};

/**
 * @param {TodoFlow} flow
 */
const teardown = async flow => {
  await flow.clearFilters();

  const todos = await flow.getTodos();
  const removes = todos.map((_, index) => flow.removeTodo(index));

  await Promise.all(removes);
};
