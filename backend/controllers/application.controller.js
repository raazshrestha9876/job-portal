import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import errorHandler from "../utils/errorHandler.js";

export const applyJob = async (req, res, next) => {
  try {
    const seekerId = req.userId;
    const jobId = req.params.jobId;

    const { message } = req.body;

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: seekerId,
    });

    if (existingApplication) {
      return next(errorHandler(400, "You have already applied for this job."));
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: seekerId,
      message,
    });

    //increment job applications count
    await Job.findByIdAndUpdate(jobId, { $inc: { applications: 1 } });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApplication,
    });
  } catch (error) {
    next(error);
  }
};

export const getAppliedJobs = async (req, res, next) => {
  try {
    const seekerId = req.userId;

    const application = await Application.find({ applicant: seekerId })
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

export const getApplications = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const recruiterId = req.userId;

    const job = await Job.findOne({ _id: jobId, createdBy: recruiterId });
    if (!job) {
      return next(errorHandler(404, "Job not found or you are not authorized"));
    }
    const applications = await Application.find({
      job: job._id,
    })
      .populate("job")
      .populate("applicant");

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    const recruiterId = req.userId;

    const application = await Application.findOne({
      _id: applicationId,
    }).populate("job");
    if (!application) return next(errorHandler(404, "Application not found"));

    if (recruiterId !== application.job.createdBy.toString()) {
      return next(
        errorHandler(403, "You are not authorized to update this application")
      );
    }

    if (application.status !== "pending")
      return next(errorHandler(400, "Application status is not pending"));

    if (application.status === status)
      return next(errorHandler(400, "Application status is already updated"));

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
