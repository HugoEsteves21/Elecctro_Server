"use strict";

const todoController = require("./controller/todo");
const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  /*   server.route({
    method: "GET",
    path: "/user/{id}",
    handler: (req, h) => {
      let user = req.params.id;

      let redirection = h.redirect("/");
      return `Hello ${user}`;
    },
  }); */

  server.route({
    method: "GET",
    path: "/todos",
    handler: (req, h) => {
      return todoController.getToDos(req, h);
    },
  });

  server.route({
    method: "POST",
    path: "/todos",
    handler: (req, h) => {
      return todoController.createToDo(req, h);
    },
  });

  server.route({
    method: "PATCH",
    path: "/todo/{id}",
    handler: (req, h) => {
      return todoController.patchToDo(req, h);
    },
  });

  server.route({
    method: "DELETE",
    path: "/todo/{id}",
    handler: (req, h) => {
      return todoController.deleteToDo(req, h);
    },
  });

  server.route({
    method: "GET",
    path: "/{any*}",
    handler: (req, h) => {
      return "<h1>Wrong page!</h1>";
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
