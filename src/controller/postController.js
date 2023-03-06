import { getObjectId2 } from "../helpers/mongoosevalidation.js";
import post from "../models/Post.js";

import {
  addPosts,
  editPosts,
  getUserPosts,
  deletePosts,
  editStatus,
  getPosts,
} from "../services/postServices.js";

export const addPost = async (req, res) => {
  try {
    let { userId, content } = req.body;
    const { authUser, userRole, token } = req.body;

    let userObjectId = getObjectId2(userId);

    if (userRole == 0 || authUser.equals(userObjectId)) {
      let new_post = await addPosts(userObjectId, content);

      return res.json({
        new_post: new_post,
        msg: "Posted Successfully.",
      });
    } else {
      return res.json({ msg: " you can not add post on user behalf." });
    }
  } catch (err) {
    console.log(err, "there is an error in add post controller.");
    return res.json({ msg: "there is an error while adding post" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    let postObjectId = getObjectId2(postId);

    let postToFind = await getPosts(postObjectId);

    if (postToFind == undefined) {
      return res.json({
        msg: "Post Not Found.",
      });
    } else {
      return res.json(postToFind);
    }
  } catch (err) {
    console.log(err, "there is an error in get post controller.");
    return res.json({ msg: "there is an error while getting post." });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;

    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let userObjectId = getObjectId2(userId);

    let postToFind = (await getUserPosts(userObjectId)).slice(
      startIndex,
      endIndex
    );

    if (postToFind == undefined) {
      return res.json({
        msg: "No Post Found from user.",
      });
    } else {
      return res.json({
        posts: postToFind,
        page: page,
        pageSize: pageSize,
        total: commentToFind.length,
      });
    }
  } catch (err) {
    console.log(err, "there is an error in get post controller.");
    return res.json({ msg: "there is an error while getting post." });
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const { authUser, userRole, token } = req.body;

    let postObjectId = getObjectId2(postId);

    let postCheck = (await post.find({ _id: postObjectId }))[0];

    if (userRole == 0 || authUser.equals(postCheck.userId)) {
      let edited_post = await editPosts(postObjectId, content);

      return res.json({
        updatedPost: edited_post,
        msg: "Post Updated.",
      });
    } else {
      return res.json({ msg: " you can not edit this post." });
    }
  } catch (err) {
    console.log(err, "there is an error in edit post controller.");
    return res.json({ msg: "there is an error while editing post" });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const { authUser, userRole, token } = req.body;

    let postObjectId = getObjectId2(postId);

    let postCheck = (await post.find({ _id: postObjectId }))[0];

    if (userRole == 0 || authUser.equals(postCheck.userId)) {
      let edited_post = await editStatus(postObjectId);
      return res.json({
        updatedPost: edited_post,
        msg: "Post Updated.",
      });
    } else {
      return res.json({ msg: " you can not edit this post." });
    }
  } catch (err) {
    console.log(err, "there is an error in change status controller.");
    return res.json({ msg: "there is an error while changing post status." });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { authUser, userRole, token } = req.body;

    let postObjectId = getObjectId2(postId);

    let postToDelete = await deletePosts(postObjectId);
    let postCheck = (await post.find({ _id: postObjectId }))[0];

    if (userRole == 0 || authUser.equals(postCheck.userId)) {
      if (postToDelete == undefined) {
        return res.json({
          msg: "No such post exists.",
        });
      } else {
        return res.json({ msg: "post deleted successfully." });
      }
    } else {
      return res.json({ msg: " you can not edit this post." });
    }
  } catch (err) {
    console.log(err, "there is an error in delete post controller.");
    return res.json({ msg: "there is an error while deleting post" });
  }
};
