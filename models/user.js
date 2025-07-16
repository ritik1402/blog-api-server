import { DataTypes } from "sequelize";
import {sequelize} from "../config/db.js"

 const User  = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },

    
    username : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        
    }   
})

export  default User;