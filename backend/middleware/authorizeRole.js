import errorHandler from "../utils/errorHandler.js";

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return next(errorHandler(401, "You cannot access this resource"));
    }
    next();
  };
};
