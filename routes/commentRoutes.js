import express from "express";
import { createComment } from "../controllers/commentController.js";
import auth from "../middleware/auth.js";

const commentRoutes = express.Router();



commentRoutes.post("/user/createcomment/:postId", auth, createComment);

export default commentRoutes;