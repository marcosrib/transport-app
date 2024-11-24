import { create } from 'zustand'
import { UserEditProps } from '../types';


type StoreProps = {
    userEdit: UserEditProps,
    addUserEdit: (user: UserEditProps) => void;
    resetDataForm: () => void;
}

export const useUserStore = create<StoreProps>((set) => ({
  userEdit: {} as UserEditProps,
  addUserEdit: (user) =>
    set((state) => ({
      userEdit: { ...state.userEdit, ...user }, 
    })),
    resetDataForm: () => set({ userEdit: {} as UserEditProps })
}))