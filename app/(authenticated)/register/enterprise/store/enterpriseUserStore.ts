import { create } from 'zustand'
import { EnterpriseEditProps } from '../types';


type StoreProps = {
    enterpriseEdit: EnterpriseEditProps,
    addEnterpriseEdit: (enterprise: EnterpriseEditProps) => void;
    resetDataForm: () => void;
}

export const useEnterpriseStore = create<StoreProps>((set) => ({
  enterpriseEdit: {} as EnterpriseEditProps,
  addEnterpriseEdit: (enterprise) =>
    set((state) => ({
      enterpriseEdit: { ...state.enterpriseEdit, ...enterprise }, 
    })),
    resetDataForm: () => set({ enterpriseEdit: {} as EnterpriseEditProps })
}))