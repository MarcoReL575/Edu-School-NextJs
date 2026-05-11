import { useFormContext } from "react-hook-form"
import { ClasesInputType, TeachersSelectType } from "../types/types"
import { FormError, FormLabel } from "@/src/shared/components/form"
import { useEffect, useState } from "react";

export default function SelectTeachers() {

    const [teachers, setTeachers] = useState<TeachersSelectType[]>([])

    useEffect(()=> {
        const getTeachers = async()=> {
            const response = await fetch('/api/teachers');
            const teachersList = await response.json();
            setTeachers(teachersList)
        }
        getTeachers();
    }, []);

    const { register, formState: { errors } } = useFormContext<ClasesInputType>()

  return (
    <div className="flex flex-col">
        <FormLabel htmlFor="teacher">Maestro</FormLabel>
        <select {...register('teacherId')} id="teacher" className="border p-2 rounded-lg">
            <option value="">--Selecciona Maestro--</option>
            {teachers.length > 0 && teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>{teacher.name} {teacher.lastName} ({teacher.level})</option>
            ))}
        </select>
        {errors.teacherId && <FormError>{errors.teacherId.message}</FormError>}
        </div>
  )
}
