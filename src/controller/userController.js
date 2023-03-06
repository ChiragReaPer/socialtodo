import { getObjectId2 } from "../helpers/mongoosevalidation.js";
import user from "../models/User.js";

import {
  addUsers,
  editUsers,
  deleteUsers,
  getUsers,
} from "../services/userServices.js";

export const addUser = async (req, res) => {
  try {
    let { name, role, email, password } = req.body;

    if (!(name && role && email && password)) {
      res.status(400).send("All input is required");
    }

    email = email.toLowerCase();

    let newUser = await user.find({ email: email });

    if (newUser[0] == undefined) {
      newUser = await addUsers(name, role, email, password);
      return res.json({
        new_user: newUser,
        msg: "New User Added.",
      });
    } else {
      return res.json({ msg: "User Already Exists." });
    }
  } catch (err) {
    console.log(err, "there is an error in add user controller.");
    return res.json({ msg: "there is an error while adding user" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let userObjectId = getObjectId2(userId);

    let userToFind = await getUsers(userObjectId);

    if (userToFind == undefined) {
      return res.json({
        msg: "User Not Found.",
      });
    } else {
      return res.json(userToFind);
    }
  } catch (err) {
    console.log(err, "there is an error in get user controller.");
    return res.json({ msg: "there is an error while getting user." });
  }
};

export const editUser = async (req, res, next) => {
  try {
    let { userId, name, email, password } = req.body;

    const { authUser, userRole, token } = req.body;

    let userObjectId = getObjectId2(userId);
    email = email.toLowerCase();

    if (userRole == 0 || authUser.equals(userObjectId)) {
      let newUser = (await user.find({ _id: userObjectId }))[0];

      // console.log(userObjectId, newUser, "******************");

      if (newUser.email != email) {
        let check_user = await user.find({ email: email });

        if (check_user[0] == undefined) {
          newUser = await editUsers(userObjectId, name, email, password);

          return res.json({
            new_user: newUser,
            msg: "User Updated.",
          });
        } else {
          return res.json({ msg: "Account Already Exists with this email." });
        }
      } else {
        newUser = await editUsers(userObjectId, name, email, password);

        return res.json({
          new_user: newUser,
          msg: "User Updated.",
        });
      }
    } else {
      return res.json({ msg: " you can not edit this user." });
    }
  } catch (err) {
    console.log(err, "there is an error in edit user controller.");
    return res.json({ msg: "there is an error while editing user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let userObjectId = getObjectId2(userId);

    const { authUser, userRole, token } = req.body;
    if (userRole == 0 || authUser.equals(userObjectId)) {
      let userToDelete = await deleteUsers(userObjectId);
      // console.log(userToDelete);

      if (userToDelete == undefined) {
        return res.json({
          msg: "No such user exists.",
        });
      } else {
        return res.json({ msg: "user deleted successfully." });
      }
    } else {
      return res.json({ msg: " you can not delete this user." });
    }
  } catch (err) {
    console.log(err, "there is an error in delete user controller.");
    return res.json({ msg: "there is an error while deleting user" });
  }
};
