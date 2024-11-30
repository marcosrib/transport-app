'use client';
import { TableCustom } from '@/app/(authenticated)/_components/table';
import { FiEdit } from 'react-icons/fi';
import { useMotoristStore } from '../store/motoristUserStore';
import useURLParams from '@/app/(authenticated)/hooks/useURLParams';
import { MotoristEditProps } from '../types';
interface Props {
  motorists: MotoristEditProps;
}

export default function ButtonEdit({ motorists }: Props) {
  const { addMotoristEdit } = useMotoristStore();
  const { setParam } = useURLParams();
  async function handleEditUser(data: any): Promise<void> {
    addMotoristEdit(data);
    openModal();
  }

  function openModal() {
    setParam('show-modal', 'motorist-edit');
  }

  return (
    <TableCustom.Button
      data={motorists}
      onClick={handleEditUser}
      color={'edit'}
    >
      <TableCustom.Icon icon={<FiEdit color={'white'} size={16} />} />
    </TableCustom.Button>
  );
}
