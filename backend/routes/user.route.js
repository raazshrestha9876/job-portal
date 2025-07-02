import express from "express";
import { validate } from "../middleware/validator.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/user.validator.js";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);
router.get("/profile/get", verifyToken, getProfile);
router.put("/profile/update/:id", verifyToken, updateProfile);
router.get("/logout", verifyToken, logout);

export default router;
