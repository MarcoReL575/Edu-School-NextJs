import { create } from 'zustand'
import { ClasesInfoComplete, HorariosClases, HorariosInsertType, HorariosSelectType } from '../types/types';
import { GroupSelectType } from '../../group/types/types';
import { boolean } from 'zod';

interface ClasesProps {
    nameClass: ClasesInfoComplete;
    userId: string;
    actualStudentGroup: GroupSelectType;
    horarioClase: HorariosSelectType;
    claseId: string;
    setClaseId: (claseId: string) => void;
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
    claseId: '',
    setClaseId: (claseId) => set({ claseId }),
    setActualStudentGroup: (value)=> set({ actualStudentGroup: value }), 
    setNameClass: (nameClass)=> set({ nameClass }),
    setUserId: (userId)=> set({ userId }),
    setHorarioClase: (horarioClase) => set({ horarioClase }),
}))
