'use client'

import { Form, FormError, FormInput, FormLabel,  FormSubmit } from '@/src/shared/components/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCheck, IconPencil } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { NewTeacherSchema } from '../schema/schema'
import { TeachersInsertType, TeachersSelectType } from '../types/types'
import { addNewTeacherAction, editInfoTeacherAction } from '../actions/teachersActions'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { generateSlug } from '../../tasks/helpers/generateSlug'

type Props = {
    userId: string;
    teacherInfo?: TeachersSelectType
}

export default function FormCreateNewTeacher({ userId, teacherInfo }: Props) {
    const queryClient = useQueryClient();

    const { handleSubmit, formState: { errors }, register, watch, setValue } = useForm({
        resolver: zodResolver(NewTeacherSchema),
        mode: 'onBlur',
        defaultValues: {
            name: teacherInfo?.name?? '',
            lastName: teacherInfo?.lastName?? '',
            slug: teacherInfo?.slug?? '',
            level: teacherInfo?.level?? ''
        }
    });

    const nameValue = watch('name');
    const lastNameValue = watch('lastName');

    useEffect(() => {
        const combined = `${nameValue || ''} ${lastNameValue || ''}`;
        const newSlug = generateSlug(combined);
        setValue('slug', newSlug, { shouldValidate: true });
    }, [nameValue, lastNameValue, setValue]);

    const handleAddTeacher = async (teacherNewInfo: TeachersInsertType)=> {
        // Añadimos al maestro si no existe
        if(!teacherInfo?.slug) {
            const { success, message } = await addNewTeacherAction(teacherNewInfo);
            if(!success) {
                toast.error(message);
                return
            }
    
            if(success){
                toast.success(message);
                await queryClient.invalidateQueries({ queryKey: ['teachersList', userId] });
                redirect('/dashboard/maestros');
            }
        }

        // Editamos al maestro si ya existe
        if(teacherInfo?.slug) {
            const { success, message } = await editInfoTeacherAction(teacherNewInfo, teacherInfo.slug);
            if(!success) {
                toast.error(message);
                return
            }
    
            if(success){
                toast.success(message);
                await queryClient.invalidateQueries({ queryKey: ['teachersList', userId] });
                redirect(`/dashboard/maestros/${teacherNewInfo.slug}`);
            }
        }
    }

  return (
    <Form onSubmit={handleSubmit(handleAddTeacher)} className='flex flex-col max-w-xl border rounded-lg p-6'>
        <FormLabel>Nombres</FormLabel>
        <FormInput  { ...register('name') } type='text' placeholder='Alan Fernando' />
        {errors.name && <FormError>{errors.name.message}</FormError>}

        <FormLabel>Apellidos</FormLabel>
        <FormInput {...register('lastName')} type='text' placeholder='Martínez López' />
        {errors.lastName && <FormError>{errors.lastName.message}</FormError>}

        <FormLabel>Nivel Academico</FormLabel>
        <select {...register('level')} className='p-2 border rounded-lg'>
            <option value="">--Selecciona una opción--</option>
            <option value='secundaria'>Secundaria</option>
            <option value='preparatoria'>Preparatoria</option>
        </select>
        {errors.level && <FormError>{errors.level.message}</FormError>}

        <FormSubmit>
            {
                teacherInfo?.slug 
                ?   <><IconPencil /> Editar Maestro</>
                :   <><IconCheck/> Añadir Maestro</>
            }
        </FormSubmit>
    </Form>
  )
}
