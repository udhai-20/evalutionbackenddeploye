const { Router } = require("express");
const UserMOdel = require("../model/user.model");
require("dotenv").config();
const userRouter = Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const find = await UserMOdel.find({ email });
    if (find.length == 0) {
      bcrypt.hash(password, 7, async function (err, hash) {
        const store_data = UserMOdel({ email, password: hash });
        await store_data.save();
        res.send("{msg:user added}");
      });
    } else {
      res.send("{msg:email already exists}");
    }
  } catch (err) {
    console.log(err);
    res.send("{err:somthing went Wrong}");
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const find = await UserMOdel.find({ email });
    console.log("  find[0]._id:", find[0]._id);
    if (find.length > 0) {
      const hased_password = find[0].password;
      bcrypt.compare(password, hased_password, async function (err, result) {
        if (result) {
          var token = jwt.sign(
            { userID: find[0]._id },
            process.env.SECRETE_CODE
          );
          res.send({ msg: "successfull", token: token, user: find[0]._id });
        } else {
          res.status(404).send({ msg: "failure" });
        }
      });
    } else {
      res.send("{msg:email already exists}");
    }
  } catch (err) {
    console.log(err);
    res.send("{err:somthing went Wrong}");
  }
});

module.exports = { userRouter };
