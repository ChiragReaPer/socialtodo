import jwt from "jsonwebtoken";
import config from "config";
import generator from "generate-password";
import Token from "../models/Token.js";

export const createTokenCollection = async (userId) => {
  try {
    // Generating Refresh Token
    const refreshToken = generator.generate({
      length: 20,
      numbers: true,
    });

    // Json Web Token Payload
    const payload = {
      user: {
        id: userId,
      },
    };

    // Signing JWT Token
    const signedToken = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: "30d",
    });

    let check_token = (await Token.find({ userId: userId }))[0];

    if (check_token == undefined) {
      const tokenFields = {};

      tokenFields.userId = userId;
      tokenFields.userAuthToken = signedToken;
      tokenFields.userRefreshToken = refreshToken;
      tokenFields.tokenExpiredOn = Date.now() + 86400000 * 30;

      const createdToken = new Token(tokenFields);
      await createdToken.save();

      return createdToken;
    } else {
      let updatedToken = await Token.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            userAuthToken: signedToken,
            userRefreshToken: refreshToken,
            tokenExpiredOn: Date.now() + 86400000 * 30,
          },
        },
        { new: true }
      );

      return updatedToken;
    }
  } catch (err) {
    console.log(err, "there is an error in create token collection services.");
  }
};
