import express from "express";
const router = express.Router();
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes!",
});

import {
  login,
  logout,
  register,
  updateUser,
  getCurrentUser,
} from "../controllers/authController.js";
import testUser from "../middleware/testUser.js";
import authenticateUser from "../middleware/auth.js";

router.get("/logout", logout);
router.route("/login").post(apiLimiter, login);
router.route("/register").post(apiLimiter, register);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);
router.route("/updateUser").patch(authenticateUser, testUser, updateUser);

export default router;
