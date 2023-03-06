import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    // required: true,
    // index: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  commentedBy: {
    type: String,
  },
  commentedAt: {
    type: Number,
    default: Date.now(),
  },
});

const comment = mongoose.model("Comment", CommentSchema);
export default comment;
