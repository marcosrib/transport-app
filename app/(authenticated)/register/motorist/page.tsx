import { Suspense } from 'react';
import MotoristForm from './components/MotoristForm';
import MotoristList from './components/MotoristList';
import { ParamsProps } from './types';

export default function Enterprise({ searchParams }: ParamsProps) {
  const defaultParams = { name: '', page: 1 };
  const params = searchParams || defaultParams;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MotoristForm />
      <MotoristList searchParams={params} />
    </Suspense>
  );
}
