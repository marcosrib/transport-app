'use client';

import { Modal } from '@/app/(authenticated)/_components/modal';
import { Input } from '@/app/components/input';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/app/(authenticated)/_components/button/Button';
import { employeesEditSchema } from '../schemas/employeesEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmployeesEditFormTypeSchema, EmployeesEditProps } from '../types';
import { toast } from 'react-toastify';

import { useEmployeesStore } from '../store/employeesStore';
import { useEffect } from 'react';
import { updateEmployess } from '../actions/EmployeesAction';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import CustomSelect from '@/app/(authenticated)/_components/select/CustomSelect';
import { SelectEnterpriseOptionsProps } from '../../enterprise/types';

type Props = {
  enterprise: SelectEnterpriseOptionsProps[];
  data: EmployeesEditProps;
};

export default function EmplopyeesEditForm({ enterprise, data }: Props) {
  const { emplopyeesEdit: emplopyees } = useEmployeesStore();
  const { deleteParam, compareParam } = useURLParams();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeesEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(employeesEditSchema),
  });

  useEffect(() => {
    setValue('email', data.email);
    setValue('cpf', data.cpf);
    setValue('rg', data.rg);
    setValue('phone', data.phone);
    setValue('name', data.name);
    setValue('enterprise', {
      value: data?.enterprise.value,
      label: data?.enterprise.label,
    });
  }, [data]);

  async function submitUserForm(data: EmployeesEditFormTypeSchema) {
    const updateEmplopyeesResult = await updateEmployess(data, emplopyees.id);
    if (updateEmplopyeesResult.status !== 204) {
      toast.error(updateEmplopyeesResult.message);
      return;
    }
    closeModal();
    toast.success(updateEmplopyeesResult.message);
  }

  function closeModal() {
    deleteParam('show-modal');
  }

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={compareParam('show-modal', 'employees-edit')}
        title={'Editar Funcionario'}
      >
        <Modal.Form onSubmit={handleSubmit(submitUserForm)}>
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
              <Input.Label label="CNPJ" />
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
            <Button label={'Atualizar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
