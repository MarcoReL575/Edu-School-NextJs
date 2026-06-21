'use client'

import { redirect } from 'next/navigation';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import createExamAction from '../actions/examAction';
import { Form, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { QuestionItem } from './QuestionItem';
import { insertExamSchema } from '../schemas/schema';
import { TeachersClases } from '../../teachers/types/types';
import { InsertExamWithQuestions } from '../types/types';

type Props = {
    clases: TeachersClases[];
    teacherId: string;
}

export default function FormCreateExam({ clases, teacherId }: Props) {
    const methods = useForm<InsertExamWithQuestions>({
        resolver: zodResolver(insertExamSchema),    
        mode: 'onChange',
        defaultValues: {
            title: '',
            groupId: '',
            subjectName: '',
            status: 'activo',
            teacherId: teacherId,
            questions: [{
                questionText: '',
                type: 'multiple',
                points: 5,
                options: [
                    { text: '', isCorrect: false },
                    { text: '', isCorrect: false }
                ]
            }]
        }
    });

    const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
        control: methods.control,
        name: "questions"
    });

    const handleCreateExam = async(data: InsertExamWithQuestions)=> {
        const { success, message } = await createExamAction(data);
        if(!success) {
            toast.error(message);
        }
        if(success){
            toast.success(message);
            redirect('/dashboard/examenes');
        }
    }

  return (
    <FormProvider {...methods}>
        <Form className='flex flex-col' onSubmit={methods.handleSubmit(handleCreateExam)}>
            <FormLabel htmlFor='title'>Título del Exámen</FormLabel>
            <FormInput {...methods.register('title')} id='title' type='text' placeholder='Examen Febrero: Capítulo 2 Fracciones' />
            {methods.formState.errors.title && <FormError>{methods.formState.errors.title.message}</FormError>}

            <FormInput {...methods.register('teacherId')} id='teachrId' type='hidden'/>
            {methods.formState.errors.subjectName && <FormError>{methods.formState.errors.subjectName.message}</FormError>}

            <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                    <FormLabel htmlFor='subjectName'>Materia/Asignatura</FormLabel>
                    <FormInput {...methods.register('subjectName')} id='subjectName' type='text' placeholder='Ej. Matemáticas' />
                    {methods.formState.errors.subjectName && <FormError>{methods.formState.errors.subjectName.message}</FormError>}
                </div>

                <div className='flex flex-col'>
                    <FormLabel htmlFor='groupId'>Selecciona el grupo</FormLabel>
                    <select {...methods.register('groupId')} id='groupId' className='border border-gray-400 p-2 rounded-lg'>
                        <option value="">--Elige una opción--</option>
                        {
                            clases.map((clase)=>(
                                <option key={clase.id} value={clase.groupId} className=' capitalize'>{clase.level}:{clase.grade}{clase.group}</option>
                            ))
                        }
                    </select>
                    {methods.formState.errors.groupId && <FormError>{methods.formState.errors.groupId.message}</FormError>}
                </div>
            </div>

            {/* Sección de Preguntas */}
            <div className="border-t pt-4">
                <h3 className="text-lg font-bold mb-4">Agrega Preguntas al Examen</h3>
                {questionFields.map((field, qIndex) => (
                    <QuestionItem key={field.id} qIndex={qIndex} control={methods.control} onRemove={() => removeQuestion(qIndex)} />
                ))}
                
                <button 
                    type="button" 
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => appendQuestion({ 
                        questionText: '', 
                        type: 'multiple', 
                        points: 5, 
                        options: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }] 
                    })}
                >
                    + Agregar Pregunta
                </button>
            </div>
            <FormSubmit>Crear Exámen</FormSubmit>
        </Form>
    </FormProvider>
  )
}