'use client';
import { useUserStore } from '../store/useUserStore';
import UserCreateForm from './EnterpriseCreateForm';
import UserEditForm from './EnterpriseEditForm';

export default function EnterpriseForm() {
  const { userEdit } = useUserStore();

  return (
    <>{userEdit.id != undefined ? <UserEditForm /> : <UserCreateForm />}</>
  );
}
