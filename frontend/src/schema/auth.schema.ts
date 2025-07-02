import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
  role: z.enum(["seeker", "recruiter"], { required_error: "Role is required" }),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Invalid password"),
});
