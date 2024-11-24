'use client';

import { Modal } from '@/app/(authenticated)/_components/modal';
import { Input } from '@/app/components/input';
import { useForm } from 'react-hook-form';
import Button from '@/app/(authenticated)/_components/button/Button';
import { userEditSchema } from '../schemas/userEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserEditFormTypeSchema } from '../types';
import { toast } from 'react-toastify';

import { useUserStore } from '../store/useUserStore';
import { useEffect } from 'react';
import { updateEnterprise } from '../actions/EnterpriseAction';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function EnterpriseEditForm() {
  const { userEdit: user } = useUserStore();
  const { deleteParam, compareParam } = useURLParams();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(userEditSchema),
  });

  async function submitUserForm(data: UserEditFormTypeSchema) {
    const updateUserResult = await updateEnterprise(data, user.id);
    if (updateUserResult.status !== 204) {
      toast.error(updateUserResult.message);
      return;
    }
    closeModal();
    toast.success(updateUserResult.message);
  }

  useEffect(() => {
    setValue('name', user.name);
    setValue('email', user.email);
    setValue('status', user.status);
    if (user?.profiles && user.profiles.length > 0) {
      setValue('profile', {
        value: user.profiles[0]?.id,
        label: user.profiles[0]?.name,
      });
    } else {
      setValue('profile', { value: 0, label: '' });
    }
  }, [user]);

  function closeModal() {
    deleteParam('show-modal');
  }

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={compareParam('show-modal', 'user-edit')}
        title={'Editar Usuário'}
      >
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input defaultValue={user?.name} {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="E-mail" />
              <Input.Input defaultValue={user?.email} {...register('email')} />
              <Input.LabelError helperText={errors.email?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Senha" />
              <Input.Input {...register('password')} />
              <Input.LabelError helperText={errors.password?.message} />
            </Input.Root>
          </Modal.FormInputs>
          <Modal.FormFooter>
            <Button label={'Atualizar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
