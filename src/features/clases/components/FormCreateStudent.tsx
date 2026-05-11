'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createStudentAction, editStudentAction } from '../actions/studentsActions'
import { useStudentStore } from '../store/useStudentStore'
import { useGroupStore } from '../store/useGroupStore'
import { Form, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { CreateStudent, CreateStudentSchema } from '../schema/clasesSchemas'
import { useModalStore } from '@/src/shared/store/useModalStore'
import { GroupSelectType } from '../types/types'

export default function FormCreateStudent() {

    const currentStudent = useStudentStore((state)=> state.currentStudent);
    const [groups, setGroups] = useState<GroupSelectType[]>([]);
    const currentGroup = useGroupStore((state)=> state.currentGroup);
    const closeModal = useModalStore((state)=> state.closeModal);
    const queryClient = useQueryClient();

    useEffect(()=> {
        const getAllGroups = async()=> {
            const response = await fetch('/api/groups');
            const groupsList = await response.json();
            setGroups(groupsList);
        }
        getAllGroups();
    }, []);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateStudent>({
        resolver: zodResolver(CreateStudentSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            lastName: '',
            nivelEstudios: '',
            groupId: '',
            inscrito: true
        }
    });

    useEffect(()=> {
        if(currentStudent.id){
            reset({
                name: currentStudent.name,
                lastName: currentStudent.lastName,
                nivelEstudios: currentStudent.nivelEstudios,
                groupId: currentStudent.groupId,
                inscrito: currentStudent.inscrito
            })
        }
    }, [currentStudent, reset])

    const handleCreateStudent = async(data: CreateStudent)=> {
        const isEditing = !!currentStudent.id
        if(isEditing) {
            const { success, message } = await editStudentAction({id:currentStudent.id ,...data});
            if(!success){
                toast.error(message);
            }
            if(success){
                toast.success(message);
                closeModal();
                queryClient.invalidateQueries({ queryKey: ['studentsList'] });
            }
        }
        if(!isEditing){
            const { success, message } = await createStudentAction(data);
            if(!success) {
                toast.error(message);
            }
    
            if(success){
                toast.success(message);
                reset();
                closeModal();
                queryClient.invalidateQueries({ queryKey: ['studentsList'] });
            }
        }
    }

  return (
    <Form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleCreateStudent)}>
        <FormLabel htmlFor='name' >Nombre Completo del Alumno</FormLabel>
        <FormInput  {...register('name')} id='name' type='text' />
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormLabel htmlFor='lastName'>Apellidos del Alumno</FormLabel>
        <FormInput {...register('lastName')} id='lastName' type='text' />
        {errors.lastName && <FormError>{errors.lastName.message}</FormError>}

        <FormLabel htmlFor='nivelEstudios' >Nivel de Estudios</FormLabel>
        <select {...register('nivelEstudios')} id='nivelEstudios' className='py-2 px-4 rounded-lg border' >
            <option value="">--Selecciona nivel de estudios--</option>
            <option value="secundaria">Secundaria</option>
            <option value="preparatoria">Preparatoria</option>
        </select>
        {errors.nivelEstudios && <FormError>{errors.nivelEstudios.message}</FormError>}

        <FormLabel>Selecciona Un grupo</FormLabel>
        <select {...register('groupId')} id="group" className="border p-2 rounded-lg">
          <option value="">{currentGroup.id? `${currentGroup.grade} ${currentGroup.group} ${currentGroup.level}` : '--Selecciona un Grupo--'}</option>
          { groups.length >0 && groups.map((group) => (
            <option key={group.id} value={group.id}>{group.grade}{group.group} ({group.level})</option>
          ))}
        </select>
        {errors.groupId && <FormError>{errors.groupId.message}</FormError>}
    
        <FormSubmit>
            {currentStudent.id ? 'Editar Alumno' : 'Crear Alumno'}
        </FormSubmit>
    </Form>
  )
}