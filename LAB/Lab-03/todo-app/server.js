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
    text: req.body.text
  };
  todos.push(todo);
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
