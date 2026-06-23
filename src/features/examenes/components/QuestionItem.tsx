import { useFieldArray, Control, useFormContext } from 'react-hook-form';
import { IconTrash } from '@tabler/icons-react';
import { FormError, FormInput, FormLabel } from '@/src/shared/components/form';
import { Button } from '@/src/shared/components/ui/button';
import { InsertExamWithQuestions } from '../types/types';

type Props = {
    control: Control<any>;
    qIndex: number;
    onRemove: () => void;
}

export function QuestionItem({ control, onRemove, qIndex }: Props) {
    const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
        control,
        name: `questions.${qIndex}.options`
    });

    const { register, formState: { errors } } = useFormContext<InsertExamWithQuestions>();
    const questionErrors = errors.questions?.[qIndex];

    return (
        <div className="p-4 border rounded-lg mb-4 bg-gray-50">
            <div className='grid grid-cols-2'> 
                <p className='w-fit px-4 py-2 bg-black text-white rounded-lg mb-2'>Pregunta: {qIndex +1}</p>
                <div className='flex items-center justify-end gap-x-5'>
                    <div className='flex items-center gap-x-2'>
                        <FormLabel htmlFor={`questions.${qIndex}.points`}>Valor</FormLabel>
                        <FormInput {...register(`questions.${qIndex}.points`, {valueAsNumber: true})} type='number' max={20} min={1} className='border border-gray-400' />
                        <span>pts</span>
                    </div>  
                    <div>
                        <Button
                            type='button'   
                            variant={'outline'}
                            onClick={onRemove}
                            title="Eliminar pregunta"
                            className='flex items-center gap-x-2'
                        >
                            <IconTrash />
                            <span>Eliminar Pregunta</span>
                        </Button>
                    </div>
                </div>
            </div>

            <FormInput {...register(`questions.${qIndex}.questionText`)} 
                placeholder="Escribe la pregunta aquí..." 
                className="w-full p-2 mb-2 border border-gray-600 rounded-lg" 
            />
            {questionErrors?.questionText && <FormError>{questionErrors.questionText.message}</FormError>}
            <div className="space-y-2 ml-4">
                {optionFields.map((opt, oIndex) => (
                    <div key={opt.id} className="flex items-center gap-2 border border-gray-400 rounded-lg p-2">
                        <FormInput type="checkbox" {...register(`questions.${qIndex}.options.${oIndex}.isCorrect`)} />
                        <FormInput {...register(`questions.${qIndex}.options.${oIndex}.text`)} placeholder="Opción" className="flex-1 p-1 outline-none" />
                        <button 
                            type="button" 
                            onClick={() => removeOption(oIndex)}
                            className="text-red-500 hover:text-red-700 font-bold px-2"
                        >
                            <IconTrash />
                        </button>
                    </div>
                ))}
                {questionErrors?.options && <FormError>{questionErrors.options.message}</FormError>}
                <button type="button" onClick={() => appendOption({ text: '', isCorrect: false })} className="text-sm text-blue-600">
                    + Agregar opción
                </button>
            </div>
        </div>
    );
}