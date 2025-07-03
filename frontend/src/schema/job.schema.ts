import { z } from "zod";

export const postJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  requirements: z
    .array(z.string().min(1, "Requirement cannot be empty"))
    .min(1, "At least one requirement is needed"),

  salary: z.coerce.number().min(0, "Salary must be a positive number"),
  experience: z.coerce
    .number()
    .min(0, "Experience must be a positive number")
    .max(50, "Experience must be less than or equal to 50 years"),

  location: z
    .string()
    .trim()
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must be less than 100 characters"),

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

export const updateJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),

  requirements: z
    .array(z.string().min(1, "Each requirement must be a non-empty string"))
    .min(1, "At least one requirement is needed")
    .optional(),

  salary: z.coerce
    .number()
    .min(0, "Salary must be a positive number")
    .optional(),

  experience: z.coerce
    .number()
    .min(0, "Experience must be a positive number")
    .max(50, "Experience must be less than or equal to 50 years")
    .optional(),

  location: z
    .string()
    .trim()
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must be less than 100 characters")
    .optional(),

  jobType: z
    .enum(["full-time", "part-time", "contract", "internship", "remote"])
    .optional(),

  position: z.coerce
    .number()
    .min(1, "Number of positions must be at least 1")
    .optional(),

  companyId: z.string().optional(),
});
