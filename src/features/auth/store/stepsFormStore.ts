import { create } from 'zustand'
import { role } from '../types/auth-types';

interface stepFormProps {
  step: number;
  setStep: (step: number) => void;
  
  role: role;
  setRole: (role: role) => void;
}

export const useStepsForm = create<stepFormProps>()((set) => ({
    step: 1,
    role: 'estudiante',
    setStep: (step) => set({ step }),
    setRole: (role) => set({ role }),
}))