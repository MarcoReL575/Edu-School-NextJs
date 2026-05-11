import { create } from 'zustand'
import { ClasesInfoComplete, GroupSelectType, HorariosClases, HorariosInsertType, HorariosSelectType } from '../types/types';
import { boolean } from 'zod';

interface ClasesProps {
    nameClass: ClasesInfoComplete;
    userId: string;
    actualStudentGroup: GroupSelectType;
    horarioClase: HorariosSelectType;
    setNameClass: (nameClass: ClasesInfoComplete) => void;
    setUserId: (userId: string) => void;
    setActualStudentGroup: (value: GroupSelectType) => void;
    setHorarioClase: (horarioClase: HorariosSelectType)=> void;
}

export const useClasesStore = create<ClasesProps>()((set) => ({
    nameClass: {} as ClasesInfoComplete,
    userId: '',
    actualStudentGroup: {} as GroupSelectType,
    horarioClase: {} as HorariosSelectType,
    setActualStudentGroup: (value)=> set({ actualStudentGroup: value }), 
    setNameClass: (nameClass)=> set({ nameClass }),
    setUserId: (userId)=> set({ userId }),
    setHorarioClase: (horarioClase) => set({ horarioClase }),
}))
