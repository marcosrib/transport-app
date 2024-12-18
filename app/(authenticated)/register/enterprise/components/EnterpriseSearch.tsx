'use client';
import Button from '@/app/(authenticated)/_components/button/Button';
import { Form } from '@/app/(authenticated)/_components/form';
import { Input } from '@/app/components/input';
import { MdAdd } from 'react-icons/md';
import { useEnterpriseStore } from '../store/enterpriseUserStore';
import { ParamsProps, EnterpriseSearchDataProps } from '../types';
import { enterpriseSearchSchema } from '../schemas/enterpriseSearchSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function EntepriseSearch({ searchParams }: ParamsProps) {
  const { setMultipleParam, deleteMultipleParam, setParam } = useURLParams();
  const { resetDataForm } = useEnterpriseStore();

  const {
    register: registerSearch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EnterpriseSearchDataProps>({
    mode: 'onBlur',
    resolver: zodResolver(enterpriseSearchSchema),
  });

  function handleOpenModal() {
    resetDataForm();
    setParam('show-modal', 'enterprise-create');
  }

  useEffect(() => {
    if (searchParams?.cnpj) {
      setValue('cnpj', searchParams.cnpj);
    }
  }, [searchParams]);

  function handleSearchSubmit(data: EnterpriseSearchDataProps) {
    const params = [
      {
        key: 'page',
        value: '1',
      },
      {
        key: 'cnpj',
        value: data.cnpj,
      },
    ];
    setMultipleParam(params);
  }

  function clearForm() {
    deleteMultipleParam(['page', 'cnpj']);
    reset();
  }
  return (
    <Form.Root title="Empresas" onSubmit={handleSubmit(handleSearchSubmit)}>
      <Form.InputContainer>
        <Input.Root>
          <Input.Label label="CNPJ" />
          <Input.Input {...registerSearch('cnpj')} />
          <Input.LabelError helperText={errors.cnpj?.message} />
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
