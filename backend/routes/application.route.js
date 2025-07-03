import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  applyJob,
  getApplications,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
import { applyJobValidation } from "../validators/job.validator.js";
import { validate } from "../middleware/validator.js";
import { authorizeRole } from "../middleware/authorizeRole.js";
import { updateApplicationStatus } from "../validators/application.validator.js";

const router = express.Router();

router.post("/apply/:jobId", applyJobValidation, validate, verifyToken, authorizeRole("seeker"), applyJob );
router.get("/get", verifyToken, authorizeRole("seeker"), getAppliedJobs);
router.get("/get/:jobId", verifyToken, authorizeRole("recruiter"), getApplications);
router.put('/status/:id/update', updateApplicationStatus, validate, verifyToken, authorizeRole('recruiter'), updateStatus);

export default router;
