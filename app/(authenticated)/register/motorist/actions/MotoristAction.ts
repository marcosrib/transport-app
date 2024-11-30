'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


import {MotoristCreateTypeSchema, MotoristEditFormTypeSchema,  ParamsProps} from "../types";
import { revalidatePath } from "next/cache";

export async function getMotorist({ searchParams }: ParamsProps) {
  const page = searchParams?.page && searchParams.page > 0 ? searchParams.page : 1; 
  const pageSize = 20
  const skip = (page - 1) * pageSize; // Cálculo do deslocamento
  const take = pageSize; 
  const whereClause = searchParams?.name
    ? { 
        name: { 
          contains: searchParams.name, 
        }
      }
    : undefined;
  try {
  
    const motorists = await prisma.motorist.findMany({
      skip,
      take,
      where: whereClause, 
      orderBy: {
        createdAt: 'desc', 
      },
      
    })

  const total = await prisma.motorist.count({
    where: whereClause,
  }); 
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: motorists,
    page,
    totalPages
  };
  } catch (error) {
    console.log(error)
    return []
  }
}

 

export async function createMotorist(motorist: MotoristCreateTypeSchema) {

  const {name, cpf, car_name, cnh, plate, rg } = motorist;
  try {
    console.log("aqwui");
    await prisma.motorist.create({
      data: {
        name, 
        cpf, 
        car_name, 
        cnh, 
        plate, 
        rg

      },
    });

    
    
    revalidatePath('/register/motorist')
    return { 
      status: 201,
      message : 'Motorista cadastrado com sucesso'
    }
  } catch (error) {
    const err = error as any;
    return { 
      stauts: err.status,
      message : 'Erro ao cadastrar motorista:' + err.message
    }
  }
 
}

export async function updateMotorist(motorist: MotoristEditFormTypeSchema, id: number | undefined) {
  const {name, cpf, car_name, cnh, plate, rg } = motorist;

  try {
    const newEnterpreise = await prisma.motorist.update({
      where: { id: id }, 
      data: {
        name, 
        cpf, 
        car_name, 
        cnh, 
        plate, 
        rg

      },
    });
    revalidatePath('/register/motorist')
    return  messageErro(204, `Motorista atualizado com sucesso!`);
  } catch (error) {
    const err = error as any;
    return messageErro( err.status, `Ero ao atualizar motorista: ${err.message}`);
  }
 
}


function messageErro(status: number, message: string) {
  return { 
    status,
    message
  }
}