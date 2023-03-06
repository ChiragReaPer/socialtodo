import User from "../models/User.js";
import config from "config";
import jwt from "jsonwebtoken";
import Token from "../models/Token.js";

export const auth = async (req, res, next) => {
  try {
    // Get User Id From Token

    const recievedToken = req.header("x-auth-token");

    const tokenObject = await Token.findOne({ userAuthToken: recievedToken });
    // If Token Not Found In Database
    if (!tokenObject) {
      return res.json({ msg: "Authorization Denied." });
    }
    // Verifying Token
    jwt.verify(recievedToken, config.get("jwtSecret"), async (err, decoded) => {
      if (err) {
        const message = err.message;
        if (message === "jwt expired") {
          return res.json({ msg: "Login Expired." });
        }
      }

      const userId = tokenObject.userId;

      const user = await User.findOne({ _id: userId });
      const userRole = user.role;

      req.body.authUser = userId;
      req.body.token = recievedToken;
      req.body.userRole = userRole;

      next();
    });
  } catch (err) {
    next(err);
  }
};
