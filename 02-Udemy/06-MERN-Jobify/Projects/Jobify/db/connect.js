import mongoose from "mongoose";

const connectDB = (url) => mongoose.connect(url);

export default connectDB;
