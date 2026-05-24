import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { gradeTaskAction, updateTaskGradedAction } from '../actions/tasksAction';
import { useTasksStore } from '../store/useTasksStore'
import { Form, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { GradeTaskSchema } from '../schemas/schemas';
import { GradeTasks } from '../types/types';
import { useModalStore } from '@/src/shared/store/useModalStore';

export default function FormGradeTask() {
  const taskGraded = useTasksStore((state)=> state.taskGraded);
  const taskSubmissionId = useTasksStore((state)=> state.taskSubmissionId);
  const closeModal = useModalStore((state)=> state.closeModal);
  const taskEdit = useTasksStore((state)=> state.taskEdit);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: zodResolver(GradeTaskSchema),
    defaultValues: {
      taskSubmissionId: taskSubmissionId?? '',
      grade: 0,
      feedback: ''
    } 
  });

  useEffect(()=> {
    reset({
      taskSubmissionId: taskSubmissionId, 
      grade: taskGraded.grade,
      feedback: taskGraded.feedback
    })
  }, [taskGraded, reset]);

  console.log(taskGraded);

  const handleGradeTask = async(input: GradeTasks) => {
    if(taskEdit) {
      const { success, message } = await updateTaskGradedAction(input);
      if(!success) {
        toast.error(message);
      }
      if(success) {
        toast.success(message);
        reset(); 
        closeModal();
        await queryClient.invalidateQueries({ queryKey: ['tasksGrade'] });
      }
    }
    if(!taskEdit) {  
      const feedback = input.feedback || '';
      const { success, message } = await gradeTaskAction(input.taskSubmissionId, input.grade, feedback);
      if(!success) {
        toast.error(message);
      }
      if(success) {
        toast.success(message);
        reset(); 
        closeModal();
        await queryClient.invalidateQueries({ queryKey: ['tasksGrade'] });
      }
    }
    
  }

  return (
    <Form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleGradeTask)}>
      <FormLabel htmlFor='grade'>{taskEdit ? 'Editar calificación' : 'Calificación de la tarea'}</FormLabel>
      <FormInput {...register('grade', { valueAsNumber: true })} id='grade' type='number' max={10} min={0} step={0.1} placeholder='Ingresa la calificación de la tarea' />
      {errors.grade && <FormError>{errors.grade.message}</FormError>}

      <FormLabel htmlFor='feedback'>{taskEdit ? 'Editar comentario' : 'Arega algún comentario(opcional)'}</FormLabel>
      <textarea 
        {...register('feedback')}
        id='feedback' 
        placeholder='Ingresa un comentario sobre la tarea'
        className='border rounded-lg p-2'  
      />
      {errors.feedback && <FormError>{errors.feedback.message}</FormError>}

      <FormSubmit className=''>
        {taskEdit ? 'Editar calificación' : 'Calificar tarea'}
      </FormSubmit>
    </Form>
  )
}