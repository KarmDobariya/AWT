const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    status: "pending"
  };
  todos.push(todo);
  res.json(todo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (todo) {
    todo.status = "completed";
  }
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
