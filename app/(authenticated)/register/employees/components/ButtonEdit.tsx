'use client';
import { TableCustom } from '@/app/(authenticated)/_components/table';
import { FiEdit } from 'react-icons/fi';
import { useEmployeesStore } from '../store/employeesStore';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import { EmployeesEditProps } from '../types';
interface Props {
  enterprise: EmployeesEditProps;
}

export default function ButtonEdit({ enterprise }: Props) {
  const { addEmplopyeesEdit } = useEmployeesStore();
  const { setParam } = useURLParams();
  async function handleEditEmployee(data: any): Promise<void> {
    console.log('handleEditEmployee', data);

    addEmplopyeesEdit(data);
    openModal();
  }

  function openModal() {
    setParam('show-modal', 'employees-edit');
  }

  return (
    <TableCustom.Button
      data={enterprise}
      onClick={handleEditEmployee}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
