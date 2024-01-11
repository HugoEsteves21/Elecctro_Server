const database = require("../database/db");

class ToDoDAO {
  // this layers handles all the operations with the database

  async createTodo(description, state) {
    return await database("todo")
      .insert({
        description,
        state,
      })
      //.returning(["id", "description", "state", "created_at", "completed_at"]);
      .returning({
        id: "id",
        description: "description",
        state: "state",
        createdAt: "created_at",
        completedAt: "completed_at",
      });
  }

  async getTodos() {
    return await database("todo");
  }
}

module.exports = new ToDoDAO();
