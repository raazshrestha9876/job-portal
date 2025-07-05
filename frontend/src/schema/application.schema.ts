import { z } from "zod";

export const applyJobSchema = z.object({
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be at most 500 characters"),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["pending", "accepted", "rejected"]),
});
