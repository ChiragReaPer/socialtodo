import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    // index: true
  },
  // role,  1 = user, 0 = SuperUser
  description: {
    type: String,
    // required: true
  },
  status: {
    // 0 = incomplete ; 1 = complete
    type: Number,
    // required: true
  },
  dueDate: {
    type: Number,
    // required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdOn: {
    type: Number,
    default: Date.now(),
  },
});

const todo = mongoose.model("ToDo", ToDoSchema);
export default todo;
