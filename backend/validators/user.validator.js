import { body } from "express-validator";

export const registerValidator = [
  body("fullname").notEmpty().withMessage("Full name is required").trim(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Must be 10 digits")
    .isNumeric()
    .withMessage("Must contain only numbers"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters"),

  body("role").isIn(["seeker", "recruiter"]).withMessage("Role must be seeker or recuriter"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 characters"),
];
