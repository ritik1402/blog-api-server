import express from "express";
import { createComment,getComments } from "../controllers/commentController.js";
import auth from "../middleware/auth.js";

const commentRoutes = express.Router();



commentRoutes.post("/user/createcomment/:postId", auth, createComment);
commentRoutes.get("/user/getcomments/:postId", auth, getComments);

export default commentRoutes;