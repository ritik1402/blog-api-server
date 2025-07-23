import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const { commentId } = req.query; 

    
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post not found" });


    let parentComment = null;
    if (commentId) {
      parentComment = await Comment.findOne({ where: { id: commentId } });
      
      if (!parentComment) return res.status(404).json({ message: "Parent comment not found" });
    }


    const comment = await Comment.create({
      content,
      postId,
      userId: req.user.id,
      parentId: commentId || null,
    });

    res.status(201).json({
      comment,
      message: commentId
        ? "Reply added successfully"
        : "Comment created successfully",
    });
  } catch (error) {
    console.error("Error in creating comment", error);
    res.status(500).json({ message: error.message });
  }
};




export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const allComments = await Comment.findAll({
      where: { postId },
      include: [
        {
          model: User,
          attributes: ["id", "username"], 
        },
      ],
      order: [["createdAt", "ASC"]], 
    });
    // console.log(allComments);

    
    const commentMap = {};
    const topLevelComments = []; 

    allComments.forEach(comment => {
      const plainComment = comment.toJSON(); 
      plainComment.replies = []; 
      commentMap[plainComment.id] = plainComment; 
    //   console.log(commentMap);
    });


    allComments.forEach(comment => {
      const plainComment = commentMap[comment.id];
    //   console.log(plainComment);

      if (plainComment.parentId) {
        
        const parent = commentMap[plainComment.parentId];
        console.log(parent);

        if (parent) {
          parent.replies.push(plainComment);
        }
      } else {
      
        topLevelComments.push(plainComment);
        
      }
    });

  
    res.status(200).json(topLevelComments);

  } catch (error) {
    console.error("Error fetching comments", error);
    res.status(500).json({ message: error.message });
  }
};

export const delComments = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete comment" });
    }   
    const deleteReplies = async (parentId) => {
      const replies = await Comment.findAll({ where: { parentId } });
      for (const reply of replies) {
        await deleteReplies(reply.id); 
        await reply.destroy();
      }
    };   
    await deleteReplies(comment.id);
    await comment.destroy();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment", error);
    res.status(500).json({ message: error.message });
  }
};

