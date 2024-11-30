'use client';
import { useEnterpriseStore } from '../store/enterpriseUserStore';
import EnterpriseCreateForm from './EnterpriseCreateForm';
import EnterpriseEditForm from './EnterpriseEditForm';

export default function EnterpriseForm() {
  const { enterpriseEdit } = useEnterpriseStore();

  console.log(enterpriseEdit);

  return (
    <>
      {enterpriseEdit.id != undefined ? (
        <EnterpriseEditForm />
      ) : (
        <EnterpriseCreateForm />
      )}
    </>
  );
}
