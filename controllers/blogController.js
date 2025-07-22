import User from "../models/user.js";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const id = req.user.id;
  
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await Post.create({
      title,
      content,
      userId: id,
      image,
    });

    res.status(201).json({ blog, message: "Blog created successfully" });
  } catch (err) {
    console.log("Error in Creating Blog", err);
    res.status(500).json({ message: err.message });
  }
};


export const blogs = async (req, res) => {
  try {
    const blogs = await Post.findAll();
    res.status(200).json({ blogs });
  } catch (error) {
    console.log("Error in fetching Blogs", error);
    res.status(500).json({ message: error.message });
  }
};

export const myBlog = async (req, res) => {
  const id = req.user.id;
  try {
    const blog = await Post.findAll({ where: { userId: id } });

    if (!blog || blog.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found for this user." });
    }

    res.status(200).json(blog); 
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const editBlog = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const blog = await Post.findOne({ where: { id } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this blog" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : blog.image;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image;

    await blog.save();

    res.status(200).json({ blog, message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error editing blog:", error);
    res.status(500).json({ message: error.message });
  }
};


export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Post.findOne({ where: { id } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this blog" });
    }

    await blog.destroy();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getBlog = async(req,res) => {
  const {id} = req.params;
  try{
    const blog = await Post.findOne({where:{id}});
    if(!blog){
      return res.status(404).json({message:"Blog not found"});
    }
    res.status(200).json(blog);
  }
  catch (err){
    console.log("Error in getting blog",err);
    res.status(500).json({message:err.message});
  }
}
