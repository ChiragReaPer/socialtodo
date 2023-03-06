import { getObjectId2 } from "../helpers/mongoosevalidation.js";
import todo from "../models/todo.js";

import {
  addTodos,
  editTodos,
  deleteTodos,
  getUserToDos,
  getTodos,
  doneUndone,
} from "../services/todoServices.js";

export const addToDo = async (req, res) => {
  try {
    let { userId, title, description, dueDate } = req.body;
    const { authUser, userRole, token } = req.body;

    let userObjectId = getObjectId2(userId);

    if (userRole == 0 || authUser.equals(userObjectId)) {
      let new_todo = await addTodos(userObjectId, title, description, dueDate);

      return res.json({
        new_todo: new_todo,
        msg: "todo created Successfully.",
      });
    } else {
      return res.json({ msg: " you can not add todo for this user." });
    }
  } catch (err) {
    console.log(err, "there is an error in add todo controller.");
    return res.json({ msg: "there is an error while adding todo" });
  }
};

export const getToDo = async (req, res) => {
  try {
    const { todoId } = req.params;

    let todoObjectId = getObjectId2(todoId);

    let todoToFind = await getTodos(todoObjectId);

    if (todoToFind == undefined) {
      return res.json({
        msg: "todo Not Found.",
      });
    } else {
      return res.json(todoToFind);
    }
  } catch (err) {
    console.log(err, "there is an error in get todo controller.");
    return res.json({ msg: "there is an error while getting todo." });
  }
};

export const getUserToDo = async (req, res) => {
  try {
    const { userId } = req.params;

    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let userObjectId = getObjectId2(userId);

    let todoToFind = (await getUserToDos(userObjectId)).slice(
      startIndex,
      endIndex
    );

    if (todoToFind == undefined) {
      return res.json({
        msg: "todo Not Found.",
      });
    } else {
      return res.json({
        todoFound: todoToFind,
        page: page,
        pageSize: pageSize,
        total: commentToFind.length,
      });
    }
  } catch (err) {
    console.log(err, "there is an error in get todo controller.");
    return res.json({ msg: "there is an error while getting todo." });
  }
};

export const editToDo = async (req, res) => {
  try {
    const { todoId, title, description, dueDate } = req.body;

    const { authUser, userRole, token } = req.body;

    let todoObjectId = getObjectId2(todoId);

    let todoCheck = (await todo.find({ _id: todoObjectId }))[0];

    if (userRole == 0 || authUser.equals(todoCheck.userId)) {
      let edited_todo = await editTodos(
        todoObjectId,
        title,
        description,
        dueDate
      );

      return res.json({
        updatedtodo: edited_todo,
        msg: "todo Updated.",
      });
    } else {
      return res.json({ msg: " you can not edit this todo." });
    }
  } catch (err) {
    console.log(err, "there is an error in edit todo controller.");
    return res.json({ msg: "there is an error while editing todo" });
  }
};

export const markUnmark = async (req, res) => {
  try {
    const { todoId } = req.params;

    const { authUser, userRole, token } = req.body;

    let todoObjectId = getObjectId2(todoId);

    let todoCheck = (await todo.find({ _id: todoObjectId }))[0];

    if (userRole == 0 || authUser.equals(todoCheck.userId)) {
      let edited_todo = await doneUndone(todoObjectId);

      return res.json({
        updatedtodo: edited_todo,
        msg: "task completed.",
      });
    } else {
      return res.json({ msg: " you can not edit this todo." });
    }
  } catch (err) {
    console.log(err, "there is an error in edit todo controller.");
    return res.json({ msg: "there is an error while editing todo" });
  }
};

export const deleteToDo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const { authUser, userRole, token } = req.body;

    let todoObjectId = getObjectId2(todoId);

    let todoCheck = (await todo.find({ _id: todoObjectId }))[0];
    if (userRole == 0 || authUser.equals(todoCheck.userId)) {
      let todoToDelete = await deleteTodos(todoObjectId);

      if (todoToDelete == undefined) {
        return res.json({
          msg: "No such todo exists.",
        });
      } else {
        return res.json({ msg: "todo deleted successfully." });
      }
    } else {
      return res.json({ msg: " you can not delete this todo." });
    }
  } catch (err) {
    console.log(err, "there is an error in delete todo controller.");
    return res.json({ msg: "there is an error while deleting todo" });
  }
};
