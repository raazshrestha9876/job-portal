import Company from "../models/company.model.js";
import errorHandler from "../utils/errorHandler.js";

export const registerCompany = async (req, res, next) => {
  try {
    const { name, description, logo, location, email, phone, website } =
      req.body;

    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return next(errorHandler(400, "Company already exists"));
    }
    const company = await Company.create({
      name,
      user: req.userId,
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
    const companies = await Company.find({ user: req.userId });
    if (!companies) return next(errorHandler(404, "Company not found"));
    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, logo, location, email, phone, website } =
      req.body;

    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) return next(errorHandler(404, "Company not found"));
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

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) return next(errorHandler(404, "Company not found"));
    await Company.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
