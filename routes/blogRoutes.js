import express from "express";
import {createBlog,blogs,myBlog,editBlog,getBlog,deleteBlog} from "../controllers/blogController.js"
// import router from "express";
import auth from "../middleware/auth.js";
import upload from '../middleware/upload.js';


const blogRouter = express.Router();

blogRouter.post("/user/createblog",auth,upload.single('image'), createBlog);
blogRouter.get("/user/blogs",blogs);
blogRouter.get("/user/myblogs", auth, myBlog);  
blogRouter.put("/user/editblog/:id", auth, upload.single("image"), editBlog);
blogRouter.delete("/user/deleteblog/:id", auth, deleteBlog); 
blogRouter.get("/user/getblog/:id",auth, getBlog);


export default blogRouter;



