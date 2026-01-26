import { z } from "zod";

export const ActivitySchema = z.object({
    id: z.string(),
    name: z.string(),
    met: z.number().positive(),
    category: z.string(),
    intensity: z.enum(["low", "moderate", "vigorous", "unknown", "general"]),
    aliases: z.array(z.string()),
    keywords: z.array(z.string()),
});

export const ActivityArraySchema = z.array(ActivitySchema);

export type Activity = z.infer<typeof ActivitySchema>;