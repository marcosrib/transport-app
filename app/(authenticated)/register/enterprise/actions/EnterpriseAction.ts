'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


import { EnterpriseCreateTypeSchema, EnterpriseEditFormTypeSchema, ParamsProps } from "../types";
import { revalidatePath } from "next/cache";

export async function getEnterprise({ searchParams }: ParamsProps) {
  const page = searchParams?.page && searchParams.page > 0 ? searchParams.page : 1;
  const pageSize = 20;

  const skip = Math.max(0, (page - 1) * pageSize); 

  const take = pageSize;
  const whereClause = searchParams?.email
    ? { email: { contains: searchParams?.email } }
    : undefined;

  try {
    const enterprises = await prisma.enterprise.findMany({
      skip,
      take,
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.enterprise.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: enterprises,
      page,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return [];
  }
}

 

export async function createEnterprise(enterprise: EnterpriseCreateTypeSchema) {

  const {cnpj, email, name, municipal_registration, state_registration, phone} = enterprise;
  try {
    await prisma.enterprise.create({
      data: {
      cnpj, 
        email,
        municipal_registration: "",
        name,
        phone: "",
        state_registration: "",

      },
    });
    revalidatePath('/register/enterprise')
    return { 
      status: 201,
      message : 'Empresa cadastrado com sucesso'
    }
  } catch (error) {
    const err = error as any;
    return { 
      stauts: err.status,
      message : 'Erro ao cadastrar Empresa:' + err.message
    }
  }
 
}

export async function updateEnterprise(enterprise: EnterpriseEditFormTypeSchema, id: number | undefined) {
  const {cnpj, email, name, municipal_registration, state_registration, phone} = enterprise;

  try {
    await prisma.enterprise.update({
      where: { id: id }, 
      data: {
      cnpj, 
        email,
        municipal_registration,
        name,
        phone,
        state_registration,

      },
    });
    revalidatePath('/register/enterprise')
    return  messageErro(204, `Empresa atualizado com sucesso!`);
  } catch (error) {
    const err = error as any;
    return messageErro( err.status, `Empresa ao atualizar usuário: ${err.message}`);
  }
 
}


function messageErro(status: number, message: string) {
  return { 
    status,
    message
  }
}