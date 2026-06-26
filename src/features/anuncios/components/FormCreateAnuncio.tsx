'use client'

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCheck } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { insertAnnouncementSchema } from "../schemas/anuncios-schemas";
import { InsertAnnouncementInput } from "../types/types";

export default function FormCreateAnuncio() {

    const optionsNotifications= [
        {key: 'all', value: 'Todos los usuarios'},
        {key: 'students', value: 'Solo a los Estudiantes'},
        {key: 'teachers', value: 'Solo a los Maestros'}
    ]

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: zodResolver(insertAnnouncementSchema),
        mode: 'onBlur',
        defaultValues: {
            content: '',
            targetType: 'all',
            title: ''
        }
    });

    const handleCreateAnnounce = async(data: InsertAnnouncementInput)=> {
        
    }

  return (
    <Form className="flex flex-col max-w-2xl w-full mx-auto p-5 border border-gray-400 rounded-lg" onSubmit={handleSubmit(handleCreateAnnounce)}>
        <legend>Nuevo Anuncio</legend>
        <FormLabel>Título del anuncio</FormLabel>
        <FormInput {...register('title')} type="text" placeholder="Ej. Se suspende la clase..." />
        {errors.title && <FormError>{errors.title.message}</FormError>}

        <FormLabel>Contenido:</FormLabel>
        <textarea {...register('content')} className="border border-gray-400 p-2 rounded-lg" placeholder="El día Viernes se suspende la clase de...."></textarea>
        {errors.content && <FormError>{errors.content.message}</FormError>}
        
        <FormLabel>¿Para quién es el anuncio?</FormLabel>
        <select className="border border-t-gray-400 rounded-lg p-2">
            {
                optionsNotifications.map((option)=>(
                    <option key={option.key} value={option.key}>{option.value}</option>
                ))
            }
        </select>
        {errors.targetType && <FormError>{errors.targetType.message}</FormError>}

        <div className="w-fit mx-auto">
            <FormSubmit className="flex items-center gap-x-2 w-fit px-10 py-2 ">
                <span><IconCheck /></span>
                <span>Crear anuncio</span>
            </FormSubmit>
        </div>
    </Form>
  )
}
