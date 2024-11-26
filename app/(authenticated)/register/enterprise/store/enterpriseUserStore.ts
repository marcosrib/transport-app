import { create } from 'zustand'
import { EnterpriseEditProps } from '../types';


type StoreProps = {
    enterpriseEdit: EnterpriseEditProps,
    addEnterpriseEdit: (user: EnterpriseEditProps) => void;
    resetDataForm: () => void;
}

export const useEnterpriseStore = create<StoreProps>((set) => ({
  enterpriseEdit: {} as EnterpriseEditProps,
  addEnterpriseEdit: (user) =>
    set((state) => ({
      enterpriseEdit: { ...state.enterpriseEdit, ...user }, 
    })),
    resetDataForm: () => set({ enterpriseEdit: {} as EnterpriseEditProps })
}))