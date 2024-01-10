"use strict";

const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/user/{id}",
    handler: (req, h) => {
      let user = req.params.id;

      let redirection = h.redirect("/");
      return `Hello ${user}`;
    },
  });

  server.route({
    method: "GET",
    path: "/todos",
    handler: (req, h) => {
      let filter = req.query.filter;
      let orderBy = req.query.orderBy;
      return "<h1>Hello World!</h1>";
    },
  });

  server.route({
    method: "POST",
    path: "/todos",
    handler: (req, h) => {
      const payload = req.payload;
      const description = payload.description;
      const state = payload.state;
      const createdAt = payload.createdAt;
      const completedAt = payload.completedAt;
      const id = payload.id;

      return "Hello World!";
    },
  });

  server.route({
    method: "PATCH",
    path: "/todo/{id}",
    handler: (req, h) => {
      let user = req.params.id;

      if (user) return "Hello World!";
      else return "Error!";
    },
  });

  server.route({
    method: "DELETE",
    path: "/todo/{id}",
    handler: (req, h) => {
      return "Hello World!";
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
