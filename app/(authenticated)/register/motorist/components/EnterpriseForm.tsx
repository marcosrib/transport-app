'use client';
import { useEnterpriseStore } from '../store/enterpriseUserStore';
import UserCreateForm from './EnterpriseCreateForm';
import UserEditForm from './EnterpriseEditForm';

export default function EnterpriseForm() {
  const { enterpriseEdit } = useEnterpriseStore();

  console.log(enterpriseEdit);

  return (
    <>
      {enterpriseEdit.id != undefined ? <UserEditForm /> : <UserCreateForm />}
    </>
  );
}
