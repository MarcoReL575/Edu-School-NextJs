import { FormError, FormLabel } from '@/src/shared/components/form'
import React, { useEffect, useState } from 'react'
import { ClasesInputType, SubjetcsSelectType } from '../types/types';
import { useFormContext } from 'react-hook-form';

export default function SelectSubjects() {

    const [subjects, setSubjects]= useState<SubjetcsSelectType[]>([]);
    useEffect(()=> {
        const getAllSubjects = async()=> {
            const response = await fetch('/api/subjects');
            const subjectsList = await response.json();
            setSubjects(subjectsList);
        }
        getAllSubjects();
    }, []);

    const { register, formState: { errors } } = useFormContext<ClasesInputType>()
    

  return (
    <div className="flex flex-col">
        <FormLabel htmlFor="subject">Materia</FormLabel>
        <select {...register('subjectId')} id="subject" className="border p-2 rounded-lg">
            <option value="">--Selecciona Materia--</option>
            {subjects.length > 0 && subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.name} ({subject.nivelAcademico})</option>
            ))}
        </select>
        {errors.subjectId && <FormError>{errors.subjectId.message}</FormError>}
        </div>
  )
}
