const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const uuid = require("uuid");

app.use(bodyParser.json());

const todos = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
  },
  {
    id: 2,
    title: "Learn coding",
    completed: false,
  },
  {
    id: 3,
    title: "Learn  javascript",
    completed: false,
  },
];
app.get("/", (req, res) => {
  res.send("Todo list Home page");
});
app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  // console.log(req.params.id);
  let todo = todos.filter((todo) => todo.id == req.params.id);
  res.json(todo);
});

app.post("/todos", (req, res) => {
  let body = req.body;
  console.log(body);
  todos.push({ id: uuid.v4(), ...body });
  res.json(todos);
});

app.put("/todos/:id", (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);
  if (todo) {
    todo.desc = req.body.desc;
    todo.completed = req.body.completed;
    res.json(todo);
  } else {
    res.send("todo with id is  not  exist ");
  }
});

app.delete("/todos/:id", (req, res) => {
  let index = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(index, 1);
  res.json(todos);
});

app.listen(port, () => `Server running on port ${port} 🔥`);
