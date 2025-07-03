import Company from "../models/company.model.js";
import Job from "../models/job.model.js";
import { findCompanyAndAuthorize } from "../utils/companyUtils.js";
import { findJobAndAuthorize } from "../utils/jobUtils.js";

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

    const recruiterId = req.userId;
    await findCompanyAndAuthorize(companyId, recruiterId, req.userRole);

    const job = await Job({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      company: companyId,
      createdBy: recruiterId,
    });

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobsForRecruiter = async (req, res, next) => {
  try {
    const recruiterId = req.userId;

    const jobs = await Job.find({ createdBy: recruiterId }).populate({
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

export const getJobDetailsForRecruiter = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const recruiterId = req.userId;

    const job = await Job.findOne({
      _id: jobId,
      createdBy: recruiterId,
    }).populate({
      path: "company",
    });

    return res.status(200).json({
      success: true,
      data: job,
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

    const recruiterId = req.userId;
    await findJobAndAuthorize(jobId, recruiterId, req.userRole);

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        $set: {
          title,
          description,
          requirements,
          salary,
          location,
          jobType,
          experience,
          position,
          companyId,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const recruiterId = req.userId;
    await findJobAndAuthorize(jobId, recruiterId, req.userRole);

    await Job.findByIdAndDelete(jobId);
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
