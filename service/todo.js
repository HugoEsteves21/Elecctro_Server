const todoDAO = require("../dataAcessObject/todo");

class ToDoService {
  // this layer is supposed to know of the existence of the db but not connect with it
  // in here , there's the logic and knowledge og what to do

  createTodo(description) {
    const state = "INCOMPLETE";
    return todoDAO.createTodo(description, state);
  }

  getTodos() {
    return todoDAO.getTodos();
  }
}

module.exports = new ToDoService();
