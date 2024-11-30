import { z } from "zod"
import { motoristEditSchema } from "./schemas/motoristEditSchema"
import { motoristCreateSchema  } from "./schemas/motoristCreateSchema"

export type MotoristCreateProps = {
  name: string
  rg: string
  cpf: string
  cnh: string
  car_name: string
  plate: string
}

export type MotoristEditProps = {
  id: number
  name: string
  rg: string
  cpf: string
  cnh: string
  car_name: string
  plate: string
}

export type MotoristSearchDataProps = {
  name: string,
}

export type ParamsProps = {
  searchParams?: { name: string, page: number},
}

export type MotoristCreateTypeSchema = z.infer<typeof motoristCreateSchema>

export type MotoristEditFormTypeSchema = z.infer<typeof motoristEditSchema>
