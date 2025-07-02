import { body, param } from "express-validator";

export const registerCompanyValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be exactly 10 digits")
    .isNumeric()
    .withMessage("Phone must contain only numbers"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage("Description must be between 10 and 200 characters"),

  body("website")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Invalid website URL"),
  body("logo")
    .optional({ checkFalsy: true })
    .trim()
    .isURL()
    .withMessage("Invalid logo URL"),

  body("location").optional().trim(),
];

export const updateCompanyValidation = [
  param("id").isMongoId().withMessage("Invalid company ID"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be exactly 10 digits")
    .isNumeric()
    .withMessage("Phone must contain only numbers"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage("Description must be between 10 and 200 characters"),

  body("website").optional().trim().isURL().withMessage("Invalid website URL"),
  body("logo").optional().trim().isURL().withMessage("Invalid logo URL"),
  body("location").optional().trim(),
];

export const deleteCompanyValidation = [
  param("id").isMongoId().withMessage("Invalid company ID"),
];
