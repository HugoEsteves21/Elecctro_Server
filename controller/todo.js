const todoService = require("../service/todo");

class ToDoController {
  async createTodo(req, h) {
    // this layer handles HTTP requests and handles errors
    // gets the request, delegates to the service layer and if there's an error, comunicate it back

    try {
      const description = req.payload.description;
      return await todoService.createTodo(description);
    } catch (error) {
      console.error(error);
      return h.response("404 Error! Page Not Found!").code(404);
    }
  }

  async getTodos(req, h) {
    try {
      return await todoService.getTodos();
    } catch (error) {
      console.error(error);
      return h.response("404 Error! Page Not Found!").code(404);
    }
  }
}

module.exports = new ToDoController();
