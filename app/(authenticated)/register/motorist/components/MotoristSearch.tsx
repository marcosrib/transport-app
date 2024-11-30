'use client';
import Button from '@/app/(authenticated)/_components/button/Button';
import { Form } from '@/app/(authenticated)/_components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useMotoristStore } from '../store/motoristUserStore';
import { MotoristSearchDataProps, ParamsProps } from '../types';
import { motoristSearchSchema } from '../schemas/motoristSearchSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function MotoristSearch({ searchParams }: ParamsProps) {
  const { setMultipleParam, deleteMultipleParam, setParam } = useURLParams();
  const { resetDataForm } = useMotoristStore();

  const {
    register: registerSearch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MotoristSearchDataProps>({
    mode: 'onBlur',
    resolver: zodResolver(motoristSearchSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    setParam('show-modal', 'motorist-create');
  }

  useEffect(() => {
    if (searchParams?.name) {
      setValue('name', searchParams.name);
    }
  }, [searchParams]);

  function handleSearchSubmit(data: MotoristSearchDataProps) {
    console.log(data);

    const params = [
      {
        key: 'page',
        value: '1',
      },
      {
        key: 'name',
        value: data.name,
      },
    ];
    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'name']);
    reset();
  }
  return (
    <Form.Root title="Motoristas" onSubmit={handleSubmit(handleSearchSubmit)}>
      <Form.InputContainer>
        <Input.Root>
          <Input.Label label="Nome" />
          <Input.Input {...registerSearch('name')} />
          <Input.LabelError helperText={errors.name?.message} />
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
