import express from "express";
import { createComment,getComments,delComments } from "../controllers/commentController.js";
import auth from "../middleware/auth.js";

const commentRoutes = express.Router();



commentRoutes.post("/user/createcomment/:postId", auth, createComment);
commentRoutes.get("/user/getcomments/:postId", auth, getComments);
commentRoutes.delete("/user/deletecomment/:id", auth, delComments);


export default commentRoutes;