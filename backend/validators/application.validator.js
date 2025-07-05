import { param, body } from "express-validator";

export const applyJobValidation = [
  param("jobId").isMongoId().withMessage("Invalid job ID"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .bail()
    .isLength({ min: 10, max: 500 })
    .withMessage("Message must be between 10 and 500 characters"),
];

export const updateApplicationStatus = [
  param("id").isMongoId().withMessage("Invalid Application ID"),
  body("status")
    .notEmpty()
    .withMessage("Status must be required")
    .bail()
    .isIn(["pending", "accepted", "rejected"])
    .withMessage("Status must be one of: pending, accepted, or rejected"),
];
