import express from "express";
const router = express.Router();

import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "../controllers/jobsController.js";

import testUser from "../middleware/testUser.js";

router.route("/stats").get(showStats);
router.route("/").post(testUser, createJob).get(getAllJobs);
router.route("/:id").delete(testUser, deleteJob).patch(testUser, updateJob);

export default router;
