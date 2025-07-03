import Company from "../models/company.model.js";
import errorHandler from "./errorHandler.js";

export const findCompanyAndAuthorize = async (
  companyId,
  recruiterId,
  userRole
) => {
  const company = await Company.findById(companyId);
  if (!company) {
    throw errorHandler(404, "Company not found");
  }
  if (userRole === "recruiter" && !company.user.equals(recruiterId)) {
    throw errorHandler(403, "You are not authorized to access this company");
  }
  return company;
};
