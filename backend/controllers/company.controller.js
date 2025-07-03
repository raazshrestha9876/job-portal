import Company from "../models/company.model.js";
import { findCompanyAndAuthorize } from "../utils/companyUtils.js";
import errorHandler from "../utils/errorHandler.js";

export const registerCompany = async (req, res, next) => {
  try {
    const { name, description, logo, location, email, phone, website } =
      req.body;

    const recruiterId = req.userId;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return next(errorHandler(400, "Company already exists"));
    }
    const company = await Company.create({
      name,
      user: recruiterId,
      description,
      logo,
      location,
      email,
      phone,
      website,
    });
    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnCompany = async (req, res, next) => {
  try {
    const recruiterId = req.userId;
    const companies = await Company.find({ user: recruiterId });
    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnCompanyDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recruiterId = req.userId;
    const company = await findCompanyAndAuthorize(
      id,
      recruiterId,
      req.userRole,
    );
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const { name, description, logo, location, email, phone, website, active } =
      req.body;

    const { id } = req.params;
    const recruiterId = req.userId;

    await findCompanyAndAuthorize(id, recruiterId, req.userRole);

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          description,
          logo,
          location,
          email,
          phone,
          website,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: updatedCompany,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recruiterId = req.userId;

    await findCompanyAndAuthorize(id, recruiterId, req.userRole);

    await Company.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
