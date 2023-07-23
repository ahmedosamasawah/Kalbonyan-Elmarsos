import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Name!"],
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide an Email!"],
    validate: {
      validator: validator.isEmail,
      message: "Please Provide a Valid Email!",
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide Password!"],
    minLength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "Last Name",
  },
  location: {
    type: String,
    trim: true,
    maxLength: 20,
    default: "My Location",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
