import bcrypt from "bcryptjs";
import Token from "../models/Token.js";
import user from "../models/User.js";

export const verifyLogin = async (username, password) => {
  try {
    let lowerCaseUsername = username.toLowerCase();

    let result = await user
      .aggregate()
      .project({
        name: "$name",
        email: { $toLower: "$email" },
        password: "$password",
        role: "$role",
      })
      .match({ email: lowerCaseUsername });

    let foundUser = result[0];

    if (!foundUser) {
      return "Invalid username.";
    }

    // Matching Password
    let isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return "Password is incorrect.";
    }

    return foundUser;
  } catch (err) {
    console.log(err, "there is an error in verify login services.");
  }
};

export const updatePassword = async (email, password) => {
  try {
    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update Password
    const userFields = {};
    userFields.password = hashedPassword;

    await user.findOneAndUpdate(
      { email: email },
      { $set: userFields },
      { new: true }
    );

    return Promise.resolve();
  } catch (err) {
    console.log(err, "there is an error in update password services.");
  }
};

export const logoutFunction = async (userAuthToken) => {
  try {
    let tokenFound = await Token.findOneAndDelete({
      userAuthToken: userAuthToken,
    });
    return Promise.resolve();
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};
