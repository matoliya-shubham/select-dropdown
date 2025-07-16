import { IconMap } from "@/constants/label";
import { z } from "zod";

export const addResourceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.enum(Object.keys(IconMap)),
});

export type AddResourceSchema = z.infer<typeof addResourceSchema>;
