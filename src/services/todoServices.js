import todo from "../models/todo.js";

export const addTodos = async (userId, title, description, dueDate) => {
  try {
    let todoToAdd = {};

    todoToAdd.userId = userId;
    todoToAdd.title = title;
    todoToAdd.description = description;
    todoToAdd.dueDate = dueDate;
    todoToAdd.status = 0;

    let newtodo = new todo(todoToAdd);
    await newtodo.save();

    return "todo added successfully.";
  } catch (err) {
    console.log(err, "there is an error in add todo services.");
  }
};

export const getTodos = async (todoId) => {
  try {
    let todoToFind = (await todo.find({ _id: todoId }))[0];

    return todoToFind;
  } catch (err) {
    console.log(err, "there is an error in get todo services.");
  }
};

export const getUserToDos = async (userId) => {
  try {
    let todoToFind = await todo.find({ userId: userId, status: 0 });

    return todoToFind;
  } catch (err) {
    console.log(err, "there is an error in get todo services.");
  }
};

export const editTodos = async (todoId, title, description, dueDate) => {
  try {
    let updatedTodo = await todo.findOneAndUpdate(
      { _id: todoId },
      {
        $set: {
          title: title,
          description: description,
          dueDate: dueDate,
        },
      },
      { new: true }
    );

    return updatedTodo;
  } catch (err) {
    console.log(err, "there is na error in edit todo services.");
  }
};

export const doneUndone = async (todoId) => {
  try {
    let check_todo = (await todo.find({ _id: todoId }))[0];

    let updatedTodo;

    if (check_todo.status == 0) {
      updatedTodo = await todo.findOneAndUpdate(
        { _id: todoId },
        {
          $set: {
            status: 1,
          },
        },
        { new: true }
      );
    } else {
      updatedTodo = await todo.findOneAndUpdate(
        { _id: todoId },
        {
          $set: {
            status: 0,
          },
        },
        { new: true }
      );
    }

    return updatedTodo;
  } catch (err) {
    console.log(err, "there is na error in edit todo services.");
  }
};

export const deleteTodos = async (todoId) => {
  try {
    let todoToDelete = await todo.findOneAndDelete({ _id: todoId });

    return todoToDelete;
  } catch (err) {
    console.log(err, "there is an error in delete todo services.");
  }
};
