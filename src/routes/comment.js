import express from "express";
import { auth } from "../middleware/auth.js";
import {
  addComment,
  getComment,
  deleteComment,
  editComment,
} from "../controller/commentController.js";

const router = express.Router();

router.post("/add", [auth], addComment);
router.get("/getcomments/:postId", [auth], getComment);
router.put("/edit", [auth], editComment);
router.delete("/delete/:commentId", [auth], deleteComment);

export default router;
