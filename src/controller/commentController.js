import { getObjectId2 } from "../helpers/mongoosevalidation.js";
import comment from "../models/Comment.js";

import {
  addComments,
  editComments,
  deleteComments,
  getComments,
} from "../services/commentServices.js";

export const addComment = async (req, res) => {
  try {
    let { userId, postId, content } = req.body;

    let userObjectId = getObjectId2(userId);
    let postObjectId = getObjectId2(postId);

    const { authUser, userRole, token } = req.body;

    if (userRole == 0 || authUser.equals(userObjectId)) {
      let new_comment = await addComments(userObjectId, postObjectId, content);

      return res.json({
        new_comment: new_comment,
        msg: "commented Successfully.",
      });
    } else {
      return res.json({ msg: " you cannot add comment for this user." });
    }
  } catch (err) {
    console.log(err, "there is an error in add comment controller.");
    return res.json({ msg: "there is an error while adding comment" });
  }
};

export const getComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 40;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let postObjectId = getObjectId2(postId);

    let commentToFind = (await getComments(postObjectId)).slice(
      startIndex,
      endIndex
    );

    if (commentToFind == undefined) {
      return res.json({
        msg: "No Comments found.",
      });
    } else {
      return res.json({
        comments: commentToFind,
        page: page,
        pageSize: pageSize,
        total: commentToFind.length,
      });
    }
  } catch (err) {
    console.log(err, "there is an error in get comment controller.");
    return res.json({ msg: "there is an error while getting comment." });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId, content } = req.body;
    const { authUser, userRole, token } = req.body;

    let commentObjectId = getObjectId2(commentId);

    let commentCheck = (await comment.find({ _id: commentId }))[0];

    if (userRole == 0 || authUser.equals(commentCheck.commentedBy)) {
      let edited_comment = await editComments(commentObjectId, content);

      return res.json({
        updatedcomment: edited_comment,
        msg: "comment Updated.",
      });
    } else {
      return res.json({ msg: "you cannot edit this comment." });
    }
  } catch (err) {
    console.log(err, "there is an error in edit comment controller.");
    return res.json({ msg: "there is an error while editing comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { authUser, userRole, token } = req.body;

    let commentObjectId = getObjectId2(commentId);

    let commentCheck = (await comment.find({ _id: commentId }))[0];

    if (userRole == 0 || authUser.equals(commentCheck.commentedBy)) {
      let commentToDelete = await deleteComments(commentObjectId);

      if (commentToDelete == undefined) {
        return res.json({
          msg: "No such comment exists.",
        });
      } else {
        return res.json({ msg: "comment deleted successfully." });
      }
    } else {
      return res.json({ msg: "you cannot delete this comment." });
    }
  } catch (err) {
    console.log(err, "there is an error in delete comment controller.");
    return res.json({ msg: "there is an error while deleting comment" });
  }
};
