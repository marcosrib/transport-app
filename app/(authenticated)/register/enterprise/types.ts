import { z } from "zod"
import { enterpriseEditSchema } from "./schemas/enterpriseEditSchema"
import { enterpriseCreateSchema  } from "./schemas/enterpriseCreateSchema"

export type ProfileProps = {
    id: number,
    name: string,
  }
  
export type SelectProfileOptionsProps = {
  value: number,
  label: string,
}

export type UpdateSatusProps = {
  id?: number,
  status: boolean,
  
}
  
export type UserDataProps = {
  name: string,
  email: string,

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
  id: number
  name: string
  email: string
  cnpj: string
  state_registration: string
  municipal_registration: string
  phone: string
}

export type UserSearchDataProps = {
  email: string,
}

export type ParamsProps = {
  searchParams?: { email: string, page: string},
}

export type EnterpriseCreateTypeSchema = z.infer<typeof enterpriseCreateSchema>

export type EnterpriseEditFormTypeSchema = z.infer<typeof enterpriseEditSchema>
