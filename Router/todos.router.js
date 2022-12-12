const { Router } = require("express");
const todosRouter = Router();
const TodosMOdel = require("../model/Todos.model");

todosRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TodosMOdel.find({ _id: id });
    res.send({ msg: "sucess", data: data });
  } catch (err) {
    console.log(err);
    res.send("{err:somthing went Wrong}");
  }
});

todosRouter.get("", async (req, res) => {
  try {
    const { title, status, tag } = req.query;
    let query = {};
    if (title) {
      query.title = title;
    }
    if (status) {
      query.status = status;
    }
    if (tag) {
      query.tag = tag;
    }
    console.log(query);
    const data = await TodosMOdel.find(query);
    console.log("data:", data);
    res.send({ msg: "sucess", data: data });
  } catch (err) {
    console.log(err);
    res.send("{err:somthing went Wrong}");
  }
});

todosRouter.post("/post", async (req, res) => {
  try {
    const data = req.body;
    const id = req.body.userId;
    console.log("id:", id);
    if (id) {
      const data_post = new TodosMOdel(data);
      await data_post.save();
      res.status(202).send("{msg:data added}");
    } else {
      res.send("login again");
    }
  } catch (err) {
    console.log(err);
    res.status.send("{msg:something went wrong");
  }
});

todosRouter.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.body.userId;
    const data = req.body;
    const note = await TodosMOdel.findOne({ _id: id });
    console.log(" id:", note.userId, userID);
    if (userID !== note.userId) {
      res.send("not authorised user");
    } else {
      await TodosMOdel.findByIdAndUpdate({ _id: id }, data);
      res.status(200).send("{msg: data updated successfully");
    }
  } catch (err) {
    console.log("err");
    res.send("{msg:something went wrong}");
  }
});

todosRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userID = req.body.userId;
    const data = req.body;
    const note = await TodosMOdel.findOne({ _id: id });
    console.log(" id:", note.userId, userID);
    if (userID !== note.userId) {
      res.send("not authorised user");
    } else {
      await TodosMOdel.findByIdAndDelete({ _id: id }, data);
      res.status(200).send("{msg: data deleted successfully");
    }
  } catch (err) {
    console.log("err");
    res.send("{msg:something went wrong}");
  }
});

module.exports = todosRouter;
