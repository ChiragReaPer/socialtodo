import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    // required: true,
    // index: true
  },
  status: {
    // 1: shown ; 0: hidden
    type: Number,
    // required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  postedBy: {
    type: String,
  },
  createdOn: {
    type: Number,
    default: Date.now(),
  },
});

const post = mongoose.model("Post", PostSchema);
export default post;
