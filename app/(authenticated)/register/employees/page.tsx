import { Suspense } from 'react';
import EnterpriseForm from './components/EmplopyeesForm';
import EnterpriseList from './components/EmplopyeesList';
import { ParamsProps } from './types';

export default function Employees({ searchParams }: ParamsProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterpriseForm />
      <EnterpriseList searchParams={searchParams} />
    </Suspense>
  );
}
