import { body, param } from "express-validator";

export const postJobValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Job title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required")
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage("Job description must be between 10 and 500 characters"),

  body("requirements")
    .exists({ checkFalsy: true })
    .withMessage("Requirements field is required")
    .bail()
    .isArray({ min: 1 })
    .withMessage("Requirements must be a non-empty array")
    .bail()
    .custom((arr) =>
      arr.every((req) => typeof req === "string" && req.trim().length > 0)
    )
    .withMessage("Each requirement must be a non-empty string"),

  body("salary")
    .notEmpty()
    .withMessage("Salary is required")
    .bail()
    .isNumeric()
    .withMessage("Salary must be a number")
    .bail()
    .custom((value) => value >= 0)
    .withMessage("Salary must be greater than or equal to 0"),

  body("experience")
    .notEmpty()
    .withMessage("Experience is required")
    .bail()
    .isInt({ min: 0, max: 50 })
    .withMessage("Experience must be between 0 and 50 years"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Location must be between 3 and 100 characters"),

  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .bail()
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage("Invalid job type"),

  body("position")
    .notEmpty()
    .withMessage("Position is required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Position must be at least 1"),

  body("companyId")
    .notEmpty()
    .withMessage("Company ID is required")
    .bail()
    .isMongoId()
    .withMessage("Company ID must be valid"),
];

export const updateJobValidation = [
  param("id").isMongoId().withMessage("Invalid job ID"),
  body("title")
    .trim()
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Job title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("Job description must be between 10 and 500 characters"),

  body("requirements")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Requirements must be a non-empty array")
    .bail()
    .custom((arr) =>
      arr.every((req) => typeof req === "string" && req.trim().length > 0)
    )
    .withMessage("Each requirement must be a non-empty string"),

  body("salary")
    .optional()
    .isNumeric()
    .withMessage("Salary must be a number")
    .bail()
    .custom((value) => value >= 0)
    .withMessage("Salary must be greater than or equal to 0"),

  body("experience")
    .optional()
    .isInt({ min: 0, max: 50 })
    .withMessage("Experience must be between 0 and 50 years"),

  body("location")
    .trim()
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage("Location must be between 3 and 100 characters"),

  body("jobType")
    .optional()
    .isIn(["full-time", "part-time", "contract", "internship", "remote"])
    .withMessage("Invalid job type"),

  body("position")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Position must be at least 1"),

  body("companyId")
    .optional()
    .isMongoId()
    .withMessage("Company ID must be valid"),
];

export const deleteJobValidation = [
  param("id").isMongoId().withMessage("Invalid job ID"),
];

