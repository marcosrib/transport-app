import { z } from "zod";

export const enterpriseSearchSchema = z.object({
    cnpj: z.string()
});
