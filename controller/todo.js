const todoService = require("../service/todo");

class ToDoController {
  // this layer handles HTTP requests and handles errors
  // gets the request, delegates to the service layer and if there's an error, comunicate it back

  async createToDo(req, h) {
    try {
      return await todoService.createToDo(req);
    } catch (error) {
      console.error(error);
      return h.response("404 Error! Page Not Found!").code(404);
    }
  }

  async getToDos(req, h) {
    try {
      return await todoService.getToDos(req, h);
    } catch (error) {
      console.error(error);
      return h.response("404 Error! Page Not Found!").code(404);
    }
  }

  async patchToDo(req, h) {
    try {
      return await todoService.patchToDo(req, h);
    } catch (error) {
      console.error(error);
      return h.response("404 Error! Page Not Found!").code(404);
    }
  }

  async deleteToDo(req, h) {
    try {
      return await todoService.deleteToDo(req, h);
    } catch (error) {
      console.error(error);
      return h.response("404 Error! Page Not Found!").code(404);
    }
  }
}

module.exports = new ToDoController();
