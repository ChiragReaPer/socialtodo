import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import userRoutes from "./src/routes/user.js";
import postRoutes from "./src/routes/post.js";
import todoRoutes from "./src/routes/todo.js";
import commentRoutes from "./src/routes/comment.js";
import authRoutes from "./src/routes/auth.js";

// Start Server
const app = express();

// Connect Database
connectDB();

//parsing body
app.use(express.json({ extended: false }));
app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/auth", authRoutes);

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("API Running");
});

// Handling Invalid Url
app.use((req, res) => {
  res.status(404).json({ errors: [{ msg: "Invalid Url" }] });
});
app.listen(PORT, () => {
  console.log(`Server Started on Port : ${PORT}`);
});
