'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


import { EnterpriseCreateTypeSchema, ProfileProps, SelectProfileOptionsProps, UserCreateTypeSchema, UserEditFormTypeSchema, UserEditProps } from "../types";
import { revalidatePath } from "next/cache";

interface Profiles {
  id: string,
  name: string
}

interface User {
  id: string,
  name: string,
  email: string,
  status: string,
  profiles: Profiles[]
}

interface UserData {
  data: User[],
  totalPages: number,
  totalElements: number,
  nextPage: number,
  previousPage: number,
  currentPage: number
}


export async function getEnterprise()  {
  try {

    return await prisma.enterprise.findMany()
  } catch (error) {
    console.log(error)
    return []
  }
}

 

export async function createEnterprise(enterprise: EnterpriseCreateTypeSchema) {

  const {cnpj, email, name, municipal_registration, state_registration, phone} = enterprise;
  try {
    const newEnterpreise = await prisma.enterprise.create({
      data: {
      cnpj, 
        email,
        municipal_registration: "",
        name,
        phone: "",
        state_registration: "",

      },
    });
    revalidatePath('/register/user')
    return { 
      status: 201,
      message : 'Usuário cadastrado com sucesso'
    }
  } catch (error) {
    const err = error as any;
    return { 
      stauts: err.status,
      message : 'Erro ao cadastrar usuário:' + err.message
    }
  }
 
}

export async function updateEnterprise(user: UserEditFormTypeSchema, id: number | undefined) {
  const { profile, ...userWithoutProfile } = user;
  const renamedProfile = {
      id: profile.value,
      name: profile.label,
    };
  
  const userWithProfilesArray = {
    ...userWithoutProfile,
    profiles: [renamedProfile],
  };

  try {
  
    revalidatePath('/register/user')
    return  messageErro(204, `Usuário atualizado com sucesso!`);
  } catch (error) {
    const err = error as any;
    return messageErro( err.status, `Usuário ao atualizar usuário: ${err.message}`);
  }
 
}

export async function updateStatusEnterprise(status: boolean, id: number | undefined) {
  const statuMessage = status ? 'ativado' : 'inativado'
  try {
    revalidatePath('/register/user')
    return  messageErro(201, `Usuário ${statuMessage} com sucesso!`);
  
  } catch (error) {
    const err = error as any;
    return  messageErro(err.status, `Erro ao atualizar status do usuário: ${err.message}`);
  }
 
}


function messageErro(status: number, message: string) {
  return { 
    status,
    message
  }
}