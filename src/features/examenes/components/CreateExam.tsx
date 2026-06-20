import { Form, FormInput, FormLabel } from '@/src/shared/components/form'
import { IconSettings } from '@tabler/icons-react'
import { TeachersClases } from '../../teachers/types/types'

type Props = {
    clases: TeachersClases[];
}

export default function CreateExam({ clases }: Props) {
    console.log(clases)
  return (
    <>
        <section className='border flex flex-col border-gray-400 rounded-lg p-4 w-full'>
            <div className='flex items-center gap-x-2'>
                <span>
                    <IconSettings />
                </span>
                <p>Configuración Inicial</p>
            </div>
            <Form className='flex flex-col'>
                <FormLabel>Título del Exámen</FormLabel>
                <FormInput type='text' placeholder='Examen Febrero: Capítulo 2 Fracciones' />
                   
                <FormLabel>Selecciona el grupo</FormLabel>
                <select className='border border-gray-400 p-2 rounded-lg'>
                    <option value="">--Elige una opción--</option>
                    {
                        clases.map((clase)=>(
                            <option key={clase.id} value="">{clase.subjectName}: {clase.grade}{clase.group}</option>
                        ))
                    }
                </select>
                
            </Form>
        </section>
    </>
  )
}
