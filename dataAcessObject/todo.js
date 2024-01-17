const database = require("../database/db");

class ToDoDAO {
  // this layers handles all the operations with the database

  async createToDo(description, state) {
    return await database("todo")
      .insert({
        description,
        state,
      })
      .returning("*");
  }

  async getToDosFiltered(filter) {
    return await database("todo")
      .where("state", "=", filter)
      .orderBy("created_at", "asc");
  }

  async getToDosOrdered(order, direction) {
    return await database("todo").orderBy(order, direction);
  }

  async getToDosFilteredAndOrdered(filter, order, direction) {
    return await database("todo")
      .where("state", "=", filter)
      .orderBy(order, direction);
  }

  async getToDos() {
    return await database("todo");
  }

  async patchDescription(id, description, h) {
    return await database("todo")
      .where("id", id)
      .andWhere("state", "INCOMPLETE")
      .then((todo) => {
        if (!todo.length) {
          return h
            .response("404 Error! Please check if todo is already completed!")
            .code(404);
        } else {
          return database("todo")
            .where("id", id)
            .update("description", description, [
              "id",
              "description",
              "state",
              "created_at",
              "completed_at",
            ]);
        }
      });
  }

  async patchState(id, newState) {
    return await database("todo")
      .where("id", id)
      .then((todo) => {
        if (todo[0].state === "INCOMPLETE") {
          return database("todo")
            .where("id", id)
            .update({ state: newState, completed_at: new Date() }, [
              "id",
              "description",
              "state",
              "created_at",
              "completed_at",
            ]);
        } else if (todo[0].state === "COMPLETE") {
          return database("todo")
            .where("id", id)
            .update({ state: newState, completed_at: null }, [
              "id",
              "description",
              "state",
              "created_at",
              "completed_at",
            ]);
        }
      });
  }

  async patchDescriptionAndState(id, description, state) {
    this.patchDescription(id, description);
    return this.patchState(id, state);
  }

  async deleteToDo(id, h) {
    return database("todo")
      .where("id", id)
      .then((todo) => {
        if (!todo.length) {
          return h.response("404 Error! Todo is already deleted!").code(404);
        } else {
          return database("todo").where("id", id).del();
        }
      });
  }
}

module.exports = new ToDoDAO();
