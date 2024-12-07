import { create } from 'zustand'
import { EmployeesEditProps } from '../types';


type StoreProps = {
    emplopyeesEdit: EmployeesEditProps,
    addEmplopyeesEdit: (emplopyees: EmployeesEditProps) => void;
    resetDataForm: () => void;
}

export const useEmployeesStore = create<StoreProps>((set) => ({
  emplopyeesEdit: {} as EmployeesEditProps,
  addEmplopyeesEdit: (emplopyees) =>
    set((state) => ({
      emplopyeesEdit: { ...state.emplopyeesEdit, ...emplopyees }, 
    })),
    resetDataForm: () => set({ emplopyeesEdit: {} as EmployeesEditProps })
}))