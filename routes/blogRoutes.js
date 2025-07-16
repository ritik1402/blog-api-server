import express from "express";
import {createBlog,blogs,myBlog,editBlog,
  deleteBlog} from "../controllers/blogController.js"
import router from "express";
import auth from "../middleware/auth.js";

const blogrouter = express.Router();

blogrouter.post("/user/createblog",auth, createBlog);
blogrouter.get("/user/blogs",blogs);
blogrouter.get("/user/myblogs", auth, myBlog);
blogrouter.put("/user/editblog/:id", auth, editBlog);    
blogrouter.delete("/user/deleteblog/:id", auth, deleteBlog); 
export default blogrouter;



