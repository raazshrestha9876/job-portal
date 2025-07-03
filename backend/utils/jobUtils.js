import Job from "../models/job.model.js";
import errorHandler from "./errorHandler.js";

export const findJobAndAuthorize = async (jobId, recruiterId, userRole) => {
  const job = await Job.findById(jobId);
  if (!job) throw errorHandler(404, "Job not found");
  if (userRole === "recruiter" && !job.createdBy.equals(recruiterId)) {
    throw errorHandler(403, "You are not authorized to access this job");
  }
  return job;
};
