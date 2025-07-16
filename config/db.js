import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL,{
    dialect: 'postgres',
    logging: false,
});
const connectDB = async () => {
 try {
  await sequelize.authenticate();
  console.log("Databse connected successfully");
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
};

export { sequelize, connectDB };