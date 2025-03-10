const express = require("express");
const server = express();
const model = require("./users/model");
server.use(express.json());

server.get("/api/users", (req, res) => {
  model.find().then((users) => {
    res.json(users);
  });
});

//get by id

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  model.findById(id).then((result) => {
    if (result == null) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(result);
    }
  });
});

//post user
server.post("/api/users/", (req, res) => {
  model.insert(req.body).then((result) => {
    const user = req.body;
    if (!user.name || !user.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      res.status(201).json(result);
    }
  });
});
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  model.remove(id).then((result) => {
    if (result == null) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(result);
    }
  });
});

server.put("/api/users/:id", (req, res) => {
  const user = req.body;
  const id = req.params.id;

  model
    .update(id, user)
    .then((possibleUser) => {
      if (!possibleUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else if (!user.name || !user.bio) {
        res
          .status(400)
          .json({ message: "Please provide name and bio for the user" });
      } else {
        res.json(possibleUser);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The user information could not be modified" });
    });
});

module.exports = server;
