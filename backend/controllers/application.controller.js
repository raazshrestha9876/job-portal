import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import errorHandler from "../utils/errorHandler.js";

export const applyJob = async (req, res, next) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return next(errorHandler(400, "You have already applied for this job."));
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    const job = Job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAppliedJobs = async (req, res, next) => {
  try {
    const userId = req.userId;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicants = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });
    if (!job) return next(errorHandler(404, "Job not found"));
    return res.status(200).json({
      success: true,
      data: job.applications,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const application = await Application.findOne({ _id: applicationId });
    if (!application) return next(errorHandler(404, "Application not found"));
    const updateApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: updateApplication,
    });
  } catch (error) {
    next(error);
  }
};
