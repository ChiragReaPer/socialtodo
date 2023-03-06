import comment from "../models/Comment.js";
import user from "../models/User.js";

export const addComments = async (userId, postId, content) => {
  try {
    let commentToAdd = {};
    let userCmt = (await user.find({ _id: userId }))[0];

    commentToAdd.commentedBy = userCmt.name;
    commentToAdd.userId = userCmt.userId;
    commentToAdd.postId = postId;
    commentToAdd.content = content;

    let newComment = new comment(commentToAdd);
    await newComment.save();

    return "commented successfully.";
  } catch (err) {
    console.log(err, "there is an error in add comment services.");
  }
};

export const getComments = async (postId) => {
  try {
    let commentToFind = await comment.find({ postId: postId });

    return commentToFind;
  } catch (err) {
    console.log(err, "there is an error in get comments services.");
  }
};

export const editComments = async (commentId, content) => {
  try {
    let updatedComment = await comment.findOneAndUpdate(
      { _id: commentId },
      {
        $set: {
          content: content,
        },
      },
      { new: true }
    );

    return updatedComment;
  } catch (err) {
    console.log(err, "there is na error in edit todo services.");
  }
};

export const deleteComments = async (commentId) => {
  try {
    let commentToDelete = await comment.findOneAndDelete({ _id: commentId });

    return commentToDelete;
  } catch (err) {
    console.log(err, "there is an error in delete comment services.");
  }
};
