import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parentId: {  
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  timestamps: true,
});

export default Comment;
