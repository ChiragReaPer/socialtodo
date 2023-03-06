import express from "express";
import { auth } from "../middleware/auth.js";
import {
  addToDo,
  getToDo,
  deleteToDo,
  getUserToDo,
  markUnmark,
  editToDo,
} from "../controller/todoController.js";

const router = express.Router();

router.post("/add", [auth], addToDo);
router.get("/get/:todoId", [auth], getToDo);
router.get("/get/todobyuser/:userId", [auth], getUserToDo);
router.put("/edit", [auth], editToDo);
router.put("/changestatus/:todoId", [auth], markUnmark);
router.delete("/delete/:todoId", [auth], deleteToDo);

export default router;
