import express from "express";
import dotenv  from "dotenv"
import { connectDB, sequelize } from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import  "./association.js";
import commentRoutes from "./routes/commentRoutes.js";
import path from "path";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
  res.json("Hello World!");
})

app.use(cors());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api",userRoutes);
app.use("/api",blogRoutes);
app.use("/api",commentRoutes);

const startServer = async () => {
  try {

      app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`)
    });

    await connectDB();
    // await sequelize.sync({ force: true });
    await sequelize.sync();
    console.log("Database synced successfully.");

  
  } catch (err) {
    console.error(" Failed to start server:", err);
  }
};

startServer();
