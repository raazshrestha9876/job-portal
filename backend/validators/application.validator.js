import { param, body } from "express-validator";

export const updateApplicationStatus = [
  param("id").isMongoId().withMessage("Invalid Application ID"),
  body("status")
    .notEmpty()
    .withMessage("Status must be required")
    .bail()
    .isIn(["pending", "accepted", "rejected"])
    .withMessage("Status must be one of: pending, accepted, or rejected"),
];
