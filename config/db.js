import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoDatabase");

export const connectDB = async () => {
  try {
    // Connect To MongoDB
    await mongoose.connect(db);
    console.log("Database Connected");
  } catch (err) {
    console.log(err.message);
    // Exit Program With Failure
    process.exit(1);
  }
};
