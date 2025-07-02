import jwt from "jsonwebtoken";
import errorHandler from "../utils/errorHandler.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, "User not authenticated"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return next(errorHandler(401, "Invalid token"));
    req.userId = decoded._id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return next(error);
  }
};

export default verifyToken;
