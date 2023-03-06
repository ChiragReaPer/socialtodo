import express from "express";

// import { auth } from "../middleware/auth.js";
import {
  logout,
  regenerateToken,
  userLogin,
} from "../controller/authController.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/logout", logout);
router.post("/", regenerateToken);

export default router;
