import { z } from "zod";

export const orderFormSchema = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  customerPhone: z
    .string()
    .regex(/^(\+?233|0)[0-9]{9}$/, "Invalid Ghana phone number"),
  customerEmail: z.union([z.string().email("Invalid email address"), z.literal('')]).optional(),
  customerAddress: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address must be less than 200 characters"),
  paymentMethod: z
    .enum(["whatsapp", "momo", "delivery"] as const)
    .describe("Please select a payment method"),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;

export const productFormSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  category: z
    .enum(["phone", "accessory"] as const)
    .describe("Please select a category"),
  price: z
    .number()
    .min(1, "Price must be greater than 0")
    .max(1000000, "Price seems too high"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  image: z.string().url("Please provide a valid image URL"),
  availability: z
    .enum(["in-stock", "low-stock", "out-of-stock"] as const)
    .describe("Please select availability status"),
  specs: z.array(z.string()).default([]),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
