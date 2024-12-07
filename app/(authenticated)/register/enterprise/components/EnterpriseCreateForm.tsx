'use client';
import { useForm } from 'react-hook-form';
import { Input } from '@/app/components/input';
import Button from '../../../_components/button/Button';
import { Modal } from '../../../_components/modal';

import { EnterpriseCreateTypeSchema } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { enterpriseCreateSchema } from '../schemas/enterpriseCreateSchema';
import { createEnterprise } from '../actions/EnterpriseAction';
import { toast } from 'react-toastify';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';

export default function EnterpriseCreateForm() {
  const { compareParam, deleteParam } = useURLParams();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterpriseCreateTypeSchema>({
    mode: 'onBlur',
    resolver: zodResolver(enterpriseCreateSchema),
  });

  console.log(errors);

  async function submitEnterpriseForm(data: EnterpriseCreateTypeSchema) {
    const userResult = await createEnterprise(data);
    if (userResult.status !== 201) {
      toast.error(userResult.message);
      return;
    }
    deleteParam('show-modal');
    toast.success(userResult.message);
    reset();
  }
  return (
    <>
      <Modal.Root
        closeModal={() => deleteParam('show-modal')}
        isOpen={compareParam('show-modal', 'enterprise-create')}
        title={'Cadastrar empresa'}
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
            <Button label={'Cadastrar'} color="search" type="submit" />
          </Modal.FormFooter>
        </Modal.Form>
      </Modal.Root>
    </>
  );
}
