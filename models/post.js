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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
  type: DataTypes.STRING,
  allowNull: true, 
}
});

export default Post;
