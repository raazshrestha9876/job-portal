import jwt from "jsonwebtoken";

const generateToken = (userId, userRole) => {
  const token = jwt.sign({ _id: userId, role: userRole }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export default generateToken;
