'use client';
import Button from '@/app/(authenticated)/_components/button/Button';
import { Form } from '@/app/(authenticated)/_components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useEmployeesStore } from '../store/employeesStore';
import { ParamsProps, EmployeesSearchDataProps } from '../types';
import { enterpriseSearchSchema } from '../schemas/employeesSearchSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function EntepriseSearch({ searchParams }: ParamsProps) {
  const { setMultipleParam, deleteMultipleParam, setParam } = useURLParams();
  const { resetDataForm } = useEmployeesStore();

  const {
    register: registerSearch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EmployeesSearchDataProps>({
    mode: 'onBlur',
    resolver: zodResolver(enterpriseSearchSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    setParam('show-modal', 'employess-create');
  }

  useEffect(() => {
    if (searchParams?.cpf) {
      setValue('cpf', searchParams.cpf);
    }
  }, [searchParams]);

  function handleSearchSubmit(data: EmployeesSearchDataProps) {
    const params = [
      {
        key: 'page',
        value: '1',
      },
      {
        key: 'cpf',
        value: data.cpf,
      },
    ];
    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'cpf']);
    reset();
  }
  return (
    <Form.Root title="Funcionarios" onSubmit={handleSubmit(handleSearchSubmit)}>
      <Form.InputContainer>
        <Input.Root>
          <Input.Label label="CPF" />
          <Input.Input {...registerSearch('cpf')} />
          <Input.LabelError helperText={errors.cpf?.message} />
        </Input.Root>
      </Form.InputContainer>
      <Form.Buttons>
        <Button type="submit" color="search" label="Pesquisar" />
        <Button
          type="button"
          color="clean"
          label="Limpar"
          onClick={clearForm}
        />
        <Button
          type="button"
          icon={<MdAdd size={16} />}
          color="add"
          label="Adicionar"
          onClick={() => handleOpenModal()}
        />
      </Form.Buttons>
    </Form.Root>
  );
}
