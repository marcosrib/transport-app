'use client';
import { useMotoristStore } from '../store/motoristUserStore';
import MotoristCreateForm from './MotoristCreateForm';
import MotoristEditForm from './MotoristEditForm';

export default function MotoristForm() {
  const { motoristEdit } = useMotoristStore();

  return (
    <>
      {motoristEdit.id != undefined ? (
        <MotoristEditForm />
      ) : (
        <MotoristCreateForm />
      )}
    </>
  );
}
