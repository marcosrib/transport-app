import { create } from 'zustand'
import { MotoristEditProps } from '../types';


type StoreProps = {
    motoristEdit: MotoristEditProps,
    addMotoristEdit: (user: MotoristEditProps) => void;
    resetDataForm: () => void;
}

export const useMotoristStore = create<StoreProps>((set) => ({
  motoristEdit: {} as MotoristEditProps,
  addMotoristEdit: (user) =>
    set((state) => ({
      motoristEdit: { ...state.motoristEdit, ...user }, 
    })),
    resetDataForm: () => set({ motoristEdit: {} as MotoristEditProps })
}))