import { Suspense } from 'react';
import EnterpriseForm from './components/EnterpriseForm';
import EnterpriseList from './components/EnterpriseList';
import { ParamsProps } from './types';

export default function Enterprise({ searchParams }: ParamsProps) {
  console.log('search paams', searchParams);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnterpriseForm />
      <EnterpriseList searchParams={searchParams} />
    </Suspense>
  );
}
