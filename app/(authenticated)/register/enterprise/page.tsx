import UserForm from './components/EnterpriseForm';
import UserList from './components/EnterpriseList';
import { ParamsProps } from './types';

export default async function Enterprise({ searchParams }: ParamsProps) {
  return (
    <>
      <UserForm />
      <UserList searchParams={searchParams} />
    </>
  );
}
