const todoController = require("../controller/todo");

const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

server.route({
  method: "POST",
  path: "/todos",
  handler: (req, h) => {
    // call controller
    todoController.createTodo();

    const payload = req.payload;
    const description = payload.description;
    const state = payload.state;
    const createdAt = payload.createdAt;
    const completedAt = payload.completedAt;
    const id = payload.id;

    return "Hello World!";
  },
});
