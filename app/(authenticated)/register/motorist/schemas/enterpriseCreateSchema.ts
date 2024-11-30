import { z } from "zod"
export const enterpriseCreateSchema = z.object({
    name: z.string().min(5,{ message: "O nome precisa ter no minimo 5 caracteres" }),
    email: z.string().email('Formato do e-mail inválido'),
    cnpj: z.string().max(14, {message: "O cnpj precisa ter no minimo 14 caractéres"}),
    state_registration: z.string().optional(),
    municipal_registration: z.string().optional(),
    phone: z.string().optional(),

})