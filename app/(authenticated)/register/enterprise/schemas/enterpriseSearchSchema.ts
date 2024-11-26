import { z } from "zod";

export const enterpriseSearchSchema = z.object({
    email: z.string()
      .email('Formato do e-mail inválido'),
});
