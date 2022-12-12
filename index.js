const express = require("express");
const { conneciton } = require("./config/db");
const cors = require("cors");
const { authentication } = require("./middleware/Authentication");
const todosRouter = require("./Router/todos.router");
const { userRouter } = require("./Router/user.router");
const app = express();
app.use(cors());
app.use(express.json());

app.get("", (req, res) => {
  res.send("welcome");
});

app.use("/user", userRouter);
app.use(authentication);
app.use("/todo", todosRouter);

app.listen(8013, async () => {
  try {
    await conneciton;
    console.log(
      `connection to db is success port is listerning http://localhost:8013/`
    );
  } catch (err) {
    console.log("connection db is failed");
    console.log("err", err);
  }
});
