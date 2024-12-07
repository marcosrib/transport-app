'use client';

import { Modal } from '@/app/(authenticated)/_components/modal';
import { Input } from '@/app/components/input';
import { useForm } from 'react-hook-form';
import Button from '@/app/(authenticated)/_components/button/Button';
import { enterpriseEditSchema } from '../schemas/enterpriseEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnterpriseEditFormTypeSchema } from '../types';
import { toast } from 'react-toastify';

import { useEnterpriseStore } from '../store/enterpriseUserStore';
import { useEffect } from 'react';
import { updateEnterprise } from '../actions/EnterpriseAction';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function EnterpriseEditForm() {
  const { enterpriseEdit: enterprise } = useEnterpriseStore();
  const { deleteParam, compareParam } = useURLParams();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EnterpriseEditFormTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(enterpriseEditSchema),
  });

  async function submitEnterpriseForm(data: EnterpriseEditFormTypeSchema) {
    const updateEnterpriseResult = await updateEnterprise(data, enterprise.id);
    if (updateEnterpriseResult.status !== 204) {
      toast.error(updateEnterpriseResult.message);
      return;
    }
    closeModal();
    toast.success(updateEnterpriseResult.message);
  }

  useEffect(() => {
    setValue('name', enterprise.name);
    setValue('email', enterprise.email);
    setValue('cnpj', enterprise.cnpj);
    setValue('municipal_registration', enterprise.municipal_registration);
    setValue('state_registration', enterprise.state_registration);
    setValue('phone', enterprise.phone);
  }, [enterprise]);

  function closeModal() {
    deleteParam('show-modal');
  }

  return (
    <>
      <Modal.Root
        closeModal={closeModal}
        isOpen={compareParam('show-modal', 'enterprise-edit')}
        title={'Editar Empresa'}
      >
        <Modal.Form onSubmit={handleSubmit(submitEnterpriseForm)}>
          <Modal.FormInputs>
            <Input.Root>
              <Input.Label label="Razão social" />
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
              <Input.Input {...register('cnpj')} />
              <Input.LabelError helperText={errors.cnpj?.message} />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Inscrição municipal" />
              <Input.Input {...register('municipal_registration')} />
              <Input.LabelError
                helperText={errors.municipal_registration?.message}
              />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Inscrição estadual" />
              <Input.Input {...register('state_registration')} />
              <Input.LabelError
                helperText={errors.state_registration?.message}
              />
            </Input.Root>
            <Input.Root>
              <Input.Label label="Contato" />
              <Input.Input {...register('phone')} />
              <Input.LabelError helperText={errors.phone?.message} />
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
