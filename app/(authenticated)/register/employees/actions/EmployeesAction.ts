'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


import { EmployeesCreateTypeSchema , EmployeesEditFormTypeSchema, ParamsProps } from "../types";
import { revalidatePath } from "next/cache";

export async function getEmployees({ searchParams }: ParamsProps) {
  const page = searchParams?.page && searchParams.page > 0 ? searchParams.page : 1;
  const pageSize = 20;

  const skip = Math.max(0, (page - 1) * pageSize); 

  const take = pageSize;
  const whereClause = searchParams?.cpf
    ? { cpf: { contains: searchParams?.cpf } }
    : undefined;

  try {
    const employees = await prisma.employees.findMany({
      skip,
      take,
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        enterprise: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const total = await prisma.employees.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(total / pageSize);
     const mappedEmployees = employees.map(employee => ({
      ...employee,
      enterprise: {
        value: employee.enterprise.id.toString(), // id -> value
        label: employee.enterprise.name, // name -> label
      },
    }));
   
    return {
      data: mappedEmployees,
      page,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return [];
  }
}

 

export async function createEmployees(employess: EmployeesCreateTypeSchema) {

  const {cpf, email, name, rg, phone} = employess;
  const phoneValue = phone || '';
  const rgValue = rg || '';
  try {
    await prisma.employees.create({
      data: {
        cpf, 
        email,
        name,
        phone: phoneValue,
        rg: rgValue,
        enterpriseId: employess.enterprise.value
      },
    });
    revalidatePath('/register/employees')
    return { 
      status: 201,
      message : 'Funcionario cadastrado com sucesso'
    }
  } catch (error) {
    const err = error as any;
    return { 
      stauts: err.status,
      message : 'Erro ao cadastrar Funcionario:' + err.message
    }
  }
 
}

export async function updateEmployess(employess: EmployeesEditFormTypeSchema, id: string | undefined) {
  const {cpf, email, name, rg, phone} = employess;
  try {
    await prisma.employees.update({
      where: { id: id }, 
      data: {
        cpf, 
        email,
        rg,
        name,
        phone,
        enterpriseId: employess.enterprise.value
      },
    });
    revalidatePath('/register/employess')
    return  messageErro(204, `Funcionario atualizado com sucesso!`);
  } catch (error) {
    const err = error as any;
    return messageErro( err.status, `Erro ao atualizar Funcionario: ${err.message}`);
  }
 
}


function messageErro(status: number, message: string) {
  return { 
    status,
    message
  }
}