import express from "express";
import {
  registerCompany,
  updateCompany,
  deleteCompany,
  getOwnCompany,
} from "../controllers/company.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import { authorizeRole } from "../middleware/authorizeRole.js";
import { deleteCompanyValidation, registerCompanyValidation, updateCompanyValidation } from "../validators/company.validator.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

router.post("/register", registerCompanyValidation, validate, verifyToken, authorizeRole("recruiter"), registerCompany);
router.get("/get", verifyToken, authorizeRole("recruiter"), getOwnCompany);
router.put("/update/:id", updateCompanyValidation, validate, verifyToken, authorizeRole("recruiter"), updateCompany);
router.delete("/delete/:id", deleteCompanyValidation, validate, verifyToken, authorizeRole("recruiter"), deleteCompany);

export default router;
