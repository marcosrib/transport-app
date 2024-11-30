'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../_components/button/Button';
import { Modal } from '../../../_components/modal';

import { MotoristCreateTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { motoristCreateSchema } from '../schemas/motoristCreateSchema';
import { createMotorist } from '../actions/MotoristAction';
import { toast } from 'react-toastify';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function MotoristCreateForm() {
  const { compareParam, deleteParam } = useURLParams();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<MotoristCreateTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(motoristCreateSchema),
  });

  async function submitMotoristForm(data: MotoristCreateTypeSchema) {
    const motoristResult = await createMotorist(data);
    if (motoristResult.status !== 201) {
      console.log('erro');

      toast.error(motoristResult.message);
      return;
    }
    deleteParam('show-modal');
    toast.success(motoristResult.message);
    reset();
  }
  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'motorist-create')}
        title={'Cadastrar motorista'}
      >
        <Modal.Form onSubmit={handleSubmit(submitMotoristForm)}>
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
            <Button label={'Cadastrar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
