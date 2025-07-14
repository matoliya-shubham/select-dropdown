import { ResourceCategory } from "@/constants/label";
import { z } from "zod";

export const addResourceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(Object.values(ResourceCategory), {
    message: "Category is required",
  }),
});

export type AddResourceSchema = z.infer<typeof addResourceSchema>;
