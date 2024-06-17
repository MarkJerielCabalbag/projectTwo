import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database: ${conn.connection.host} is now connected`);
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    //1 means true
    process.exit(1);
  }
};

export default connectDB;
