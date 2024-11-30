import MotoristForm from './components/MotoristForm';
import MotoristList from './components/MotoristList';
import { ParamsProps } from './types';

export default async function Enterprise({ searchParams }: ParamsProps) {
  return (
    <>
      <MotoristForm />
      <MotoristList searchParams={searchParams} />
    </>
  );
}
