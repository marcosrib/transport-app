import { z } from "zod"
import { enterpriseEditSchema } from "./schemas/enterpriseEditSchema"
import { enterpriseCreateSchema  } from "./schemas/enterpriseCreateSchema"

export type ProfileProps = {
    id: number,
    name: string,
  }
 
export type SelectEnterpriseOptionsProps = {
  value: string,
  label: string,
} 

export type EnterpriseSearchDataProps = {
  cnpj: string,
}


export type EnterpriseCreateProps = {
  name: string
  email: string
  cnpj: string
  state_registration: string
  municipal_registration: string
  phone: string
}

export type EnterpriseEditProps = {
  id: string
  name: string
  email: string
  cnpj: string
  state_registration: string
  municipal_registration: string
  phone: string
}

export type ParamsProps = {
  searchParams?: { cnpj: string, page: number} ,
}

export type EnterpriseCreateTypeSchema = z.infer<typeof enterpriseCreateSchema>

export type EnterpriseEditFormTypeSchema = z.infer<typeof enterpriseEditSchema>
