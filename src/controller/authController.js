// import config from "config";
import { createTokenCollection } from "../services/tokenServices.js";
import {
  verifyLogin,
  updatePassword,
  logoutFunction,
} from "../services/authServices.js";
import Token from "../models/Token.js";

export const userLogin = async (req, res, next) => {
  try {
    // Destructure Body
    const { username, password } = req.body;

    // Finding User
    let foundUser = await verifyLogin(username, password);

    // Send Response
    if (typeof foundUser == "string") {
      return res.json({ msg: foundUser });
    } else {
      // Creating Token Collections
      let createdTokenCollection = await createTokenCollection(foundUser._id);

      return res.json({
        isTokenExpired: false,
        _id: foundUser?._id,
        name: foundUser.name,
        token: createdTokenCollection.userAuthToken,
        // refreshToken: createdTokenCollection.userRefreshToken,
        userRole: foundUser.role,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    // Destructure Request
    const userAuthToken = req.header("x-auth-token");

    // Logout
    await logoutFunction(userAuthToken);

    // Send Response
    return res.json({ msg: "Sucessfully Logged Out" });
  } catch (err) {
    next(err);
  }
};

export const resetUserPassword = async (req, res, next) => {
  try {
    // Destructuring Body
    const { email, password, confirmPassword } = req.body;

    // Verify Password
    if (!(password === confirmPassword)) {
      return res.json({ msg: "Passwords Do Not Match" });
    }

    // Update Password
    await updatePassword(email, password);

    // Send Response
    res.json({ msg: "Updated User Password" });
  } catch (err) {
    next(err);
  }
};

export const regenerateToken = async (req, res, next) => {
  try {
    // Getting Refresh Token
    const receivedRefreshToken = req.header("x-auth-refresh-token");

    // Getting User From Refresh Token
    const getTokenObject = await Token.findOne({
      userRefreshToken: receivedRefreshToken,
    });

    // If No Token Object Found
    if (!getTokenObject) {
      return res.json({ msg: "Invalid refresh token." });
    }

    const userId = getTokenObject.userId;

    // Json Web Token Payload
    const payload = {
      user: {
        id: userId,
      },
    };

    // Generating Refresh Token
    const refreshToken = generator.generate({
      length: 20,
      numbers: true,
    });

    // Signing JWT Token
    const signedToken = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: "1d",
    });

    const tokenFields = {};
    tokenFields.userId = userId;
    tokenFields.userAuthToken = signedToken;
    tokenFields.userRefreshToken = refreshToken;

    const tokenObject = await Token.findOneAndUpdate(
      { userId: userId },
      { $set: tokenFields },
      { new: true }
    );

    return res.json({
      userAuthToken: tokenFields.userAuthToken,
      refreshToken: tokenFields.userRefreshToken,
    });
    //const getUser = await User.findOne()
  } catch (err) {
    next(err);
  }
};

// export const verifyToken = async (req, res, next) => {
//     try {
//         // Destructure Request
//         const { userId, userRole } = req.body;

//         // Send Response
//         res.json({
//             isTokenExpired: false,
//             userId: userId,
//             userRole: userRole,
//         });
//     } catch (err) {
//         next(err);
//     }
// };
