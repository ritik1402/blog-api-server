import express from "express";
import { createUser,loginUser,} from "../controllers/userController.js";

import  auth  from "../middleware/auth.js";

const router = express.Router();

router.post("/user/register", createUser);
router.post("/user/login", loginUser);




export default router;
