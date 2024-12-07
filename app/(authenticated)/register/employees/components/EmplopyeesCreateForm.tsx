'use client';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../_components/button/Button';
import { Modal } from '../../../_components/modal';
import clsx from 'clsx';
import { EmployeesCreateTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeesCreateSchema } from '../schemas/employeesCreateSchema';
import { createEmployees } from '../actions/EmployeesAction';
import { toast } from 'react-toastify';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import CustomSelect from '@/app/(authenticated)/_components/select/CustomSelect';
import { SelectEnterpriseOptionsProps } from '../../enterprise/types';

type Props = {
  enterprise: SelectEnterpriseOptionsProps[];
};

export default function EmplopyeesCreateForm({ enterprise }: Props) {
  const { compareParam, deleteParam } = useURLParams();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeesCreateTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(employeesCreateSchema),
  });

  console.log(errors);

  async function submitEmployessForm(data: EmployeesCreateTypeSchema) {
    const employessResult = await createEmployees(data);
    if (employessResult.status !== 201) {
      toast.error(employessResult.message);
      return;
    }
    deleteParam('show-modal');
    toast.success(employessResult.message);
    reset();
  }
  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'employess-create')}
        title={'Cadastrar funcionario'}
      >
        <Modal.Form onSubmit={handleSubmit(submitEmployessForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Nome" />
              <Input.Input {...register('name')} />
              <Input.LabelError helperText={errors.name?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="E-mail" />
              <Input.Input {...register('email')} />
              <Input.LabelError helperText={errors.email?.message} />
            </Input.Root>

            <Input.Root>
              <Input.Label label="CPF" />
              <Input.Input {...register('cpf')} />
              <Input.LabelError helperText={errors.cpf?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="RG" />
              <Input.Input {...register('rg')} />
              <Input.LabelError helperText={errors.rg?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Contato" />
              <Input.Input {...register('phone')} />
              <Input.LabelError helperText={errors.phone?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Empresas" />
              <Controller
                name="enterprise"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    isSearchable={false}
                    options={enterprise}
                    defaultValue={0}
                    defaultLabel="Selecione a empresa"
                    control={control}
                  />
                )}
              />
              <Input.LabelError helperText={errors?.enterprise?.message} />
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
