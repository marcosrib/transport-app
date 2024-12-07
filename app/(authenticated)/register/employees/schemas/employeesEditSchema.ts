import { z } from "zod";

const enterpriseSchema = z.object({
    value: z.string()
    .min(30, 'A empresa é obrigatório'),
    label: z.string(),
  });


export const employeesEditSchema = z.object({
  name: z.string().min(5,{ message: "O nome precisa ter no minimo 5 caracteres" }),
  email: z.string().email('Formato do e-mail inválido'),
  cpf: z.string().max(11, {message: "O cnpj precisa ter no minimo 14 caractéres"}),
  rg: z.string().optional(),
  phone: z.string().optional(),
  enterprise: enterpriseSchema
})