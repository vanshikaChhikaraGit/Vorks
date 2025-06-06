import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["PROVIDER", "CUSTOMER"])
});

export const createServiceSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(0, "Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  image: z.string(),
  serviceLocation:z.string().min(1,"Location of service is required")
})