import User from "../models/user.model.js";
import errorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import setAuthCookie from "../utils/cookieHelper.js";

export const register = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) return next(errorHandler(400, "Email already exists"));

    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User create successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(400, "Invalid Credentials"));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return next(errorHandler(400, "Invalid Credentials"));

    const token = generateToken(user._id, user.role);
    const { password: pass, ...rest } = user._doc;

    setAuthCookie(res, token);
    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return next(errorHandler(404, "User not found"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

// api test remaining

export const updateProfile = async (req, res, next) => {
  try {
    if (req.params.id === req.userId) {
      const { fullname, email, phoneNumber, bio, skills } = req.body;
      const file = req.file.filename;
      const skillsArray = skills.split(",");
      const user = await User.findById(req.params.id);
      if (!user) return next(errorHandler(404, "User not found"));

      //cloudinary upload
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            fullname,
            email,
            phoneNumber,
            bio,
            skills: skillsArray,

            //resume comes later here...
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
