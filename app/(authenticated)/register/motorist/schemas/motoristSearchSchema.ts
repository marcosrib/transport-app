import { z } from "zod";

export const motoristSearchSchema = z.object({
    name: z.string().min(4, 'Minimo 4 caractéres'),
});
