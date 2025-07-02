import Job from "../models/job.model.js";
import errorHandler from "../utils/errorHandler.js";

export const postJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.userId;
    const requirementsArray = requirements.split(",");
    const job = await Job({
      title,
      description,
      requirements: requirementsArray,
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      created_by: userId,
    });
    await job.save();
    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: job
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path: "company",
    });
    return res
      .status(200)
      .json({
        success: true,
        data: jobs,
      })
      .sort({ createdAt: -1 });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) return next(errorHandler(404, "Job not found"));
    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminJobs = async (req, res, next) => {
  try {
    const adminId = req.userId;
    const jobs = await Job.find({ createdBy: adminId });
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const requirementsArray = requirements.split(",");
    const job = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        requirements: requirementsArray,
        salary: Number(salary),
        location,
        jobType,
        experience,
        position,
        companyId,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    await Job.findByIdAndDelete(jobId);
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
