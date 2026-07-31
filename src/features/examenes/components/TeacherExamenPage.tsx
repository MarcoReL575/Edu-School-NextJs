import Heading from '@/src/shared/components/typography/Heading'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { examService } from '../services/examService'
import { teacherService } from '../../teachers/services/teacherService'
import CardExamTeacher from './CardExamTeacher'

type Props = {
    userId: string
}

export default async function TeacherExamenPage({ userId }: Props) {

    const { teacher } = await teacherService.getTeacherByUserId(userId);
    const exams = await examService.getExams(teacher.id);
    console.log(exams)

  return (
    <>
        <section className="flex w-full mx-auto flex-col sm:flex-row sm:items-center sm:justify-between gap-y-4 border-b border-gray-100 pb-4 ">
            <div>
                <Heading level={2}>Gestor de Exámenes</Heading>
                <Heading level={3} className="text-sm text-gray-500 mt-1">Crea evaluaciones, programa fechas y analiza el rendimiento de tus grupos.</Heading>
            </div>

            <div>
                <Link href={'/dashboard/examenes/CreateExam'}>
                    <button
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 bg-black hover:bg-gray-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-sm transition shrink-0"
                    >
                        <IconPlus className="h-4 w-4" />
                        Nuevo Examen
                    </button>
                </Link>
            </div>
        </section>

        <section className='grid grid-cols-2 gap-4'>
        {exams.length > 0
            ?   exams.map((exam)=> (
                    <CardExamTeacher key={exam.id} exam={exam} />
                )) 
            :   <div>Aún no hay examenes creados</div>
        }
        </section>
    </>
  )
}
