import User from '../models/user.js';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;
        const blog = await Post.findOne({ where: { id: postId } });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const comment = await Comment.create({ content, postId });
        res.status(201).json({ comment, message: "Comment created successfully" });
        } catch (error) {
            console.log("Error in creating comment", error);
            res.status(500).json({ message: error.message });
        }
    };