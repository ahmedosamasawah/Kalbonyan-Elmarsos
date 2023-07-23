import mongoose from "mongoose";

const Schema = mongoose.Schema;
const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide a Company!"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please Provide a Position!"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "My Location",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide a User!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
