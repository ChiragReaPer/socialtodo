import express from "express";
import { auth } from "../middleware/auth.js";

import {
  addUser,
  getUser,
  deleteUser,
  editUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/get/:userId", getUser);
router.put("/edit", [auth], editUser);
router.delete("/delete/:userId", [auth], deleteUser);

export default router;
