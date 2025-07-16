import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

export default Post;
