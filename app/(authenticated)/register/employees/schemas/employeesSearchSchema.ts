import { z } from "zod";

export const enterpriseSearchSchema = z.object({
    cpf: z.string()
});
