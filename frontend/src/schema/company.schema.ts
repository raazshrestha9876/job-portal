import { z } from "zod";

export const addCompanySchema = z.object({
  name: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),
  email: z.string().email("Please enter a vaild email address"),
  phone: z.string().length(10, "Phone number must be 10 digits"),
  description: z
    .string()
    .min(1, "Company description is required")
    .max(500, "Company description is too long"),
  website: z
    .string()
    .url("Please enter a valid Website URL")
    .optional()
    .or(z.literal("")),
  location: z.string().max(100, "Company location is too long").optional(),
  logo: z
    .string()
    .url("Please enter a valid logo URL")
    .optional()
    .or(z.literal("")),
});

export const updateCompanySchema = z.object({
  name: z.string().max(100, "Company name is too long").optional(),
  email: z.string().email("Please enter a valid email address").optional(),
  phone: z.string().length(10, "Phone number must be 10 digits").optional(),
  description: z
    .string()
    .max(500, "Company description is too long")
    .optional(),
  website: z
    .union([z.string().url("Please enter a valid Website URL"), z.literal("")])
    .optional(),
  location: z.string().max(100, "Company location is too long").optional(),
  logo: z
    .union([z.string().url("Please enter a valid logo URL"), z.literal("")])
    .optional(),
});
