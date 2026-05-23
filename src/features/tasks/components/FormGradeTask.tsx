import { Form, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { useTasksStore } from '../store/useTasksStore'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GradeTaskSchema } from '../schemas/schemas';
import { useEffect } from 'react';
import { GradeTasks } from '../types/types';

export default function FormGradeTask() {

  const taskSubmissionId = useTasksStore((state)=> state.taskSubmissionId);

  const { register, handleSubmit, formState:{ errors }, reset } = useForm({
    resolver: zodResolver(GradeTaskSchema),
    defaultValues: {
      taskSubmissionId: '',
      grade: 0,
      feedback: ''
    } 
  });

  useEffect(()=> {
    reset({
      taskSubmissionId: taskSubmissionId || '', 
    })
  }, [taskSubmissionId, reset]);

  const handleGradeTask = (input: GradeTasks) => {
    console.log(input);
  }

  return (
    <Form className='flex flex-col space-y-2' onSubmit={handleSubmit(handleGradeTask)}>
      <FormLabel htmlFor='grade'>Calificación de la tarea</FormLabel>
      <FormInput {...register('grade', { valueAsNumber: true })} id='grade' type='number' max={10} min={0} step={0.1} placeholder='Ingresa la calificación de la tarea' />
      {errors.grade && <FormError>{errors.grade.message}</FormError>}

      <FormLabel htmlFor='feedback'>Arega algún comentario(opcional)</FormLabel>
      <textarea 
        {...register('feedback')}
        id='feedback' 
        placeholder='Ingresa un comentario sobre la tarea'
        className='border rounded-lg p-2'  
      />
      {errors.feedback && <FormError>{errors.feedback.message}</FormError>}

      <FormSubmit className=''>
        Calificar
      </FormSubmit>
    </Form>
  )
}
