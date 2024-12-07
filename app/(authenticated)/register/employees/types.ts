import { z } from "zod"
import { employeesEditSchema } from "./schemas/employeesEditSchema"
import { employeesCreateSchema  } from "./schemas/employeesCreateSchema"
import { SelectEnterpriseOptionsProps } from "../enterprise/types"

export type EmployeesSearchDataProps = {
  cpf: string,
}

export type EmployeesCreateProps = {
  name: string
  email: string
  cpf: string
  rg: string
  phone: string

}

export type EmployeesEditProps = {
  id: string
  name: string
  email: string
  cpf: string
  rg: string
  phone: string
  enterprise: SelectEnterpriseOptionsProps
}

export type ParamsProps = {
  searchParams?: { cpf: string, page: number} ,
}

export type EmployeesCreateTypeSchema = z.infer<typeof employeesCreateSchema>

export type EmployeesEditFormTypeSchema = z.infer<typeof employeesEditSchema>
