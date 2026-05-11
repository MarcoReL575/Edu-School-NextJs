import { create } from "zustand";

// store/useModalStore.ts
export type ModalType = 'assignGroup' | 'createClases' | 'createGroup' | 'createStudent' | 
    'modalDeleteGroup' | 'modalHorarios' | 'modalDeleteClase' | 'modalDeleteStudent' | null

interface ModalStore {
  type: ModalType;
  data: any;
  isOpen: boolean;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  openModal: (type, data = {}) => set({ isOpen: true, type, data }),
  closeModal: () => set({ isOpen: false, type: null }),
}));