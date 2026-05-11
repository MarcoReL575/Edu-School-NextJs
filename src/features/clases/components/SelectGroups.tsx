import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ClasesInputType, GroupSelectType } from '../types/types'
import { FormError, FormLabel } from '@/src/shared/components/form'
import { useClasesStore } from '../store/useClasesStore';

export default function SelectGroups() {

  const [groups, setGroups] = useState<GroupSelectType[]>([]);
  const { grade, group, level } = useClasesStore((state)=> state.actualStudentGroup);
  useEffect(()=> {
      const getAllGroups = async()=> {
          const response = await fetch('/api/groups');
          const groupsList = await response.json();
          setGroups(groupsList);
      }
      getAllGroups()
  }, []);

    const { register, formState: { errors } } = useFormContext<ClasesInputType>();

  return (
    <div className="flex flex-col">
        <FormLabel htmlFor="group">Grupo</FormLabel>
        <select {...register('groupId')} id="group" className="border p-2 rounded-lg">
          <option value="">{grade? `${grade} ${group} (${level})` : '--Selecciona un Grupo--'}</option>
          { groups.length >0 && groups.map((group) => (
            <option key={group.id} value={group.id}>{group.grade}{group.group} ({group.level})</option>
          ))}
        </select>
        {errors.groupId && <FormError>{errors.groupId.message}</FormError>}
    </div>
  )
}
