'use client';
import { TableCustom } from '@/app/(authenticated)/_components/table';
import { FiEdit } from 'react-icons/fi';
import { useEnterpriseStore } from '../store/enterpriseUserStore';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import { EnterpriseEditProps } from '../types';
interface Props {
  enterprise: EnterpriseEditProps;
}

export default function ButtonEdit({ enterprise }: Props) {
  const { addEnterpriseEdit } = useEnterpriseStore();
  const { setParam } = useURLParams();
  async function handleEditUser(data: any): Promise<void> {
    addEnterpriseEdit(data);
    openModal();
  }

  function openModal() {
    setParam('show-modal', 'enterprise-edit');
  }

  return (
    <TableCustom.Button
      data={enterprise}
      onClick={handleEditUser}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
