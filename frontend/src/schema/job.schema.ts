import { z } from "zod";

export const postJobSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  requirements: z
    .array(z.string().min(1, "Requirement cannot be empty"))
    .min(1, "At least one requirement is needed"),
  salary: z.coerce.number().min(0, "Salary must be a positive number"),
  experience: z.coerce.number().min(0, "Experience must be a positive number"),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum([
    "full-time",
    "part-time",
    "contract",
    "internship",
    "remote",
  ]),
  position: z.coerce.number().min(1, "Number of positions must be at least 1"),
  companyId: z.string().min(1, "Company is required"),
});
