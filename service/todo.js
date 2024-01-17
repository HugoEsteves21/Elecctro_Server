const todoDAO = require("../dataAcessObject/todo");

class ToDoService {
  // this layer is supposed to know of the existence of the db but not connect with it
  // in here , there's the logic and knowledge og what to do

  createToDo(req) {
    const description = req.payload.description;
    const state = "INCOMPLETE";

    return todoDAO.createToDo(description, state);
  }

  getToDos(req) {
    const filter = req.query.filter ? req.query.filter : "ALL";
    const order = req.query.orderBy ? req.query.orderBy : "";
    const direction = req.query.direction;

    if (filter !== "ALL" && order !== "")
      return todoDAO.getToDosFilteredAndOrdered(filter, order, direction);

    if (filter !== "ALL") return todoDAO.getToDosFiltered(filter);

    if (order !== "") return todoDAO.getToDosOrdered(order, direction);

    return todoDAO.getToDos();
  }

  patchToDo(req, h) {
    if (!req.payload.description && !req.payload.state)
      return h
        .response("404 Error! No description or state provided")
        .code(404);

    const id = req.params.id;
    const description = req.payload.description ? req.payload.description : "";
    const state = req.payload.state ? req.payload.state : "";

    if (description !== "" && state === "")
      return todoDAO.patchDescription(id, description, h);
    else if (description === "" && state !== "")
      return todoDAO.patchState(id, state);

    return todoDAO.patchDescriptionAndState(id, description, state);
  }

  deleteToDo(req, h) {
    const id = req.params.id;

    return todoDAO.deleteToDo(id, h);
  }
}

module.exports = new ToDoService();
