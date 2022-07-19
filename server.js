const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const TodoTask = require("./model/todoTask");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const tasks = await TodoTask.find({});
    // console.log(tasks);
    res.render("index.ejs", { todoTasks: tasks });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  const { title, content } = req.body;
  const todoTask = new TodoTask({
    title,
    content,
  });
  try {
    await todoTask.save();
    console.log(todoTask);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});

app
  .route("/edit/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    try {
      const tasks = await TodoTask.find({});
      res.render("edit.ejs", { todoTasks: tasks, taskId: id });
    } catch (error) {
      res.status(500).send(error);
    }
  })
  .post(async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    try {
      await TodoTask.findByIdAndUpdate(id, { title, content });
      res.redirect("/");
    } catch (error) {
      res.status(500).send(error);
      res.redirect("/");
    }
  });

app.route("/remove/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    await TodoTask.findByIdAndRemove(id);
    res.redirect("/");
  } catch (error) {
    return res.status(500).send(error);
  }
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to DB");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
