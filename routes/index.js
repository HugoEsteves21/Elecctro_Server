const todoController = require("../controller/todo");
const Joi = require("joi");

module.exports = [
  {
    method: "GET",
    path: "/todos",
    handler: (req, h) => {
      return todoController.getToDos(req, h);
    },
    options: {
      description: "Get all To Do's",
      notes: "Returns all To Do items both completed and incompleted.",
      tags: ["api"],
      validate: {
        query: Joi.object({
          filter: Joi.string().valid("COMPLETE", "INCOMPLETE").optional(),
          orderBy: Joi.string()
            .valid("description", "created_at", "completed_at")
            .optional(),
        }),
      },
      response: {
        failAction: "log",
      },
    },
  },
  {
    method: "POST",
    path: "/todos",
    handler: (req, h) => {
      return todoController.createToDo(req, h);
    },
    options: {
      description: "Create To Do",
      notes: "Creates a new To Do and returns the created item.",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          description: Joi.string().min(2).max(100).required(),
        }),
      },
      response: {
        failAction: "log",
      },
    },
  },
  {
    method: "PATCH",
    path: "/todo/{id}",
    handler: (req, h) => {
      return todoController.patchToDo(req, h);
    },
    options: {
      description: "Edit To Do",
      notes:
        "Changes an already existent item using the id passed in the path, and returns the edited item.",
      tags: ["api"],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
        payload: Joi.object({
          description: Joi.string().min(2).max(100).optional(),
          state: Joi.string().valid("COMPLETE", "INCOMPLETE").optional(),
        }),
      },
      response: {
        failAction: "log",
      },
    },
  },
  {
    method: "DELETE",
    path: "/todo/{id}",
    handler: (req, h) => {
      return todoController.deleteToDo(req, h);
    },
    options: {
      description: "Delete To Do",
      notes:
        "Deletes an item using the id passed in the path, and returns an empty item.",
      tags: ["api"],
      validate: {
        params: Joi.object({
          id: Joi.number().integer().required(),
        }),
      },
      response: {
        failAction: "log",
      },
    },
  },
];
