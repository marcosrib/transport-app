import { z } from "zod";

export const motoristEditSchema = z.object({
  name: z.string().min(5,{ message: "O nome precisa ter no minimo 5 caracteres" }),
    rg: z.string().min(8, {message: "O rg tem que ter no minimo 8 caractéres"}),
    cpf: z.string().min(11, {message: "O cpf precisa ter no minimo 11 caractéres"}),
    cnh: z.string().min(8, {message: "A cnh tem que ter no minimo 8 caractéres"}),
    car_name: z.string(),
    plate: z.string().min(5, {message: "A placa tem que ter no minimo 8 caractéres"}),


})