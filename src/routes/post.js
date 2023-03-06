import express from "express";
import { auth } from "../middleware/auth.js";
import {
  addPost,
  getPost,
  deletePost,
  getUserPost,
  changeStatus,
  editPost,
} from "../controller/postController.js";

const router = express.Router();

router.post("/add", [auth], addPost);
router.get("/get/:postId", [auth], getPost);
router.get("/get/postbyuser/:userId", [auth], getUserPost);
router.put("/edit", [auth], editPost);
router.put("/changestatus/:postId", [auth], changeStatus);
router.delete("/delete/:postId", [auth], deletePost);

export default router;
