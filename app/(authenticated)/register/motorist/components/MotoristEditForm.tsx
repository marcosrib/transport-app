'use client';

import { Modal } from '@/app/(authenticated)/_components/modal';
import { Input } from '@/app/components/input';
import { useForm } from 'react-hook-form';
import Button from '@/app/(authenticated)/_components/button/Button';
import { motoristEditSchema } from '../schemas/motoristEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MotoristEditFormTypeSchema } from '../types';
import { toast } from 'react-toastify';

import { useMotoristStore } from '../store/motoristUserStore';
import { useEffect } from 'react';
import { updateMotorist } from '../actions/MotoristAction';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function MotoristEditForm() {
  const { motoristEdit: motorist } = useMotoristStore();
  const { deleteParam, compareParam } = useURLParams();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MotoristEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(motoristEditSchema),
  });

  async function submitUserForm(data: MotoristEditFormTypeSchema) {
    console.log(data);

    const motoristResult = await updateMotorist(data, motorist.id);
    if (motoristResult.status !== 204) {
      toast.error(motoristResult.message);
      return;
    }
    closeModal();
    toast.success(motoristResult.message);
  }

  useEffect(() => {
    setValue('name', motorist.name);
    setValue('car_name', motorist.car_name);
    setValue('cpf', motorist.cpf);
    setValue('cnh', motorist.cnh);
    setValue('plate', motorist.plate);
    setValue('rg', motorist.rg);
  }, [motorist]);

  function closeModal() {
    deleteParam('show-modal');
  }

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={compareParam('show-modal', 'motorist-edit')}
        title={'Editar motorista'}
      >
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="RG" />
              <Input.Input {...register('rg')} />
              <Input.LabelError helperText={errors.rg?.message} />
            </Input.Root>

            <Input.Root>
              <Input.Label label="CPF" />
              <Input.Input {...register('cpf')} />
              <Input.LabelError helperText={errors.cpf?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="CNH" />
              <Input.Input {...register('cnh')} />
              <Input.LabelError helperText={errors.cnh?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Carro" />
              <Input.Input {...register('car_name')} />
              <Input.LabelError helperText={errors.car_name?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Placa" />
              <Input.Input {...register('plate')} />
              <Input.LabelError helperText={errors.plate?.message} />
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
