var jwt = require("jsonwebtoken");

require("dotenv").config();

const authentication = (req, res, next) => {
  const token_header = req.headers?.authorization;
  if (token_header) {
    var decoded = jwt.verify(token_header, process.env.SECRETE_CODE);
    if (decoded) {
      const userId = decoded.userID;
      console.log("userId:", userId);
      req.body.userId = userId;
      next();
    } else {
      res.send("login again");
    }
  } else {
    res.send("login again");
  }
};
module.exports = { authentication };
