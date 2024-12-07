'use client';
import { useQuery } from '@tanstack/react-query';
import { useEmployeesStore } from '../store/employeesStore';
import EmplopyeesCreateForm from './EmplopyeesCreateForm';
import EmplopyeesEditForm from './EmplopyeesEditForm';
import { getEnterpriseAll } from '../../enterprise/actions/EnterpriseAction';

export default function EnterpriseForm() {
  const { emplopyeesEdit } = useEmployeesStore();
  const { data: enterprises = [] } = useQuery({
    queryKey: ['getEnterprise'],
    queryFn: () => handleGetEnterprise(),
  });
  async function handleGetEnterprise() {
    return await getEnterpriseAll();
  }
  return (
    <>
      {emplopyeesEdit.id != undefined ? (
        <EmplopyeesEditForm enterprise={enterprises} data={emplopyeesEdit} />
      ) : (
        <EmplopyeesCreateForm enterprise={enterprises} />
      )}
    </>
  );
}
