import user from "../models/User.js";
import bcrypt from "bcryptjs";
import { createTokenCollection } from "./tokenServices.js";
import Token from "../models/Token.js";
import post from "../models/Post.js";
import todo from "../models/todo.js";
import comment from "../models/Comment.js";

export const addUsers = async (name, role, email, password) => {
  try {
    let userToAdd = {};

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    userToAdd.name = name;
    userToAdd.email = email;
    userToAdd.password = hashedPassword;
    userToAdd.role = role;
    userToAdd.active = true;

    let newUser = new user(userToAdd);
    newUser = await newUser.save();

    let userId = newUser._id;

    await createTokenCollection(userId);

    return "User added successfully.";
  } catch (err) {
    console.log(err, "there is an error in add user services.");
  }
};

export const getUsers = async (userId) => {
  try {
    let userToFind = (await user.find({ _id: userId }))[0];

    return userToFind;
  } catch (err) {
    console.log(err, "there is an error in get user services.");
  }
};

export const editUsers = async (userId, name, email, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      },
      { new: true }
    );

    return updatedUser;
  } catch (err) {
    console.log(err, "there is na error in edit user services.");
  }
};

export const deleteUsers = async (userId) => {
  try {
    let userToDelete = await user.findOneAndDelete({ _id: userId });

    await Token.findOneAndDelete({ userId: userId });
    await post.deleteMany({ userId: userId });
    await todo.deleteMany({ userId: userId });
    await comment.deleteMany({ userId: userId });

    return userToDelete;
  } catch (err) {
    console.log(err, "there is an error in delete user services.");
  }
};
