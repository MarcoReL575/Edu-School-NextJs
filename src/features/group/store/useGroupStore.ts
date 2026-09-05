import { create } from 'zustand'
import { GroupSelectType } from '../types/types';

interface GroupStore {
    currentGroup: GroupSelectType;
    setGroup: (group: GroupSelectType)=> void;
}

export const useGroupStore = create<GroupStore>()((set) => ({
    currentGroup: {} as GroupSelectType,
    setGroup: (group)=> set({ currentGroup: group })
}))