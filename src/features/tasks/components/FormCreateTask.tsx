'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createTaskAction } from "../actions/tasksAction";
import { useTasksStore } from "../store/useTasksStore";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/form";
import { CreateTask } from "../types/types";
import { CreateTaskSchema } from "../schemas/schemas";

export default function FormCreateTask() {
  
  const teachersClases = useTasksStore((state)=> state.teachersClases);
  const closeModal = useModalStore((state)=> state.closeModal);
  const { register, reset, handleSubmit, formState: { errors } } = useForm<CreateTask>({
    resolver: zodResolver(CreateTaskSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      claseId: '',
      fechaEntrega: ''
    }
  });

  const handleCreateTask = async(data: CreateTask)=> {
    const { success, message } = await createTaskAction(data);
    if(!success) {
      toast.error(message);
    }
    if(success){
      toast.success(message);
      closeModal();
    }
  }

  return (
    <Form className="flex flex-col" onSubmit={handleSubmit(handleCreateTask)}>
      <FormLabel htmlFor="title">Título de Tarea</FormLabel>
      <FormInput {...register('title')} id="title" type="text" />
      {errors.title && <FormError>{errors.title.message}</FormError>}

      <FormLabel htmlFor="description">Descripcion de Tarea</FormLabel>
      <FormInput {...register('description')} id="description" type="text" />
      {errors.description && <FormError>{errors.description.message}</FormError>}

      <FormLabel htmlFor="fechaEntrega">Fecha de Entrega</FormLabel>
      <FormInput {...register('fechaEntrega')} id="fechaEntrega" type="date" />
      {errors.fechaEntrega && <FormError>{errors.fechaEntrega.message}</FormError>}

      <FormLabel htmlFor="clase">Materia</FormLabel>
      <select {...register('claseId')} id="clase" className='border p-2 rounded-lg'>
        <option value="">--Selecciona una materia--</option>
        {teachersClases && teachersClases.map((clase)=> (
          <option key={clase.id} value={clase.id}>
            {clase.subjectName}: {clase.grade} {clase.group} {clase.level}
          </option>
        ))}
      </select>
      {errors.claseId && <FormError>{errors.claseId.message}</FormError>}

      <FormSubmit>Crear Tarea</FormSubmit>
    </Form>
  )
}
