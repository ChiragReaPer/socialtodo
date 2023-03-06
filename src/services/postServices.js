import comment from "../models/Comment.js";
import post from "../models/Post.js";
import user from "../models/User.js";

export const addPosts = async (userId, content) => {
  try {
    let postToAdd = {};
    let userPost = (await user.find({ _id: userId }))[0];

    postToAdd.postedBy = userPost.name;
    postToAdd.userId = userId;
    postToAdd.content = content;
    postToAdd.status = 1;

    let newPost = new post(postToAdd);
    newPost = await newPost.save();

    return newPost;
  } catch (err) {
    console.log(err, "there is an error in add post services.");
  }
};

export const getPosts = async (postId) => {
  try {
    let postToFind = (await post.find({ _id: postId }))[0];

    return postToFind;
  } catch (err) {
    console.log(err, "there is an error in get post services.");
  }
};

export const getUserPosts = async (userId) => {
  try {
    let postToFind = await post.find({ userId: userId });

    return postToFind;
  } catch (err) {
    console.log(err, "there is an error in get post services.");
  }
};

export const editPosts = async (postId, content) => {
  try {
    let updatedPost = await post.findOneAndUpdate(
      { _id: postId },
      {
        $set: {
          content: content,
        },
      },
      { new: true }
    );

    return updatedPost;
  } catch (err) {
    console.log(err, "there is na error in edit post services.");
  }
};

export const editStatus = async (postId) => {
  try {
    let check_post = (await post.find({ _id: postId }))[0];

    let updatedPost;

    if (check_post.status == 0) {
      updatedPost = await post.findOneAndUpdate(
        { _id: postId },
        {
          $set: {
            status: 1,
          },
        },
        { new: true }
      );
    } else {
      updatedPost = await post.findOneAndUpdate(
        { _id: postId },
        {
          $set: {
            status: 0,
          },
        },
        { new: true }
      );
    }

    return updatedPost;
  } catch (err) {
    console.log(err, "there is na error in edit post services.");
  }
};

export const deletePosts = async (postId) => {
  try {
    let postToDelete = await post.findOneAndDelete({ _id: postId });
    await comment.deleteMany({ postId: postId });

    return postToDelete;
  } catch (err) {
    console.log(err, "there is an error in delete post services.");
  }
};
