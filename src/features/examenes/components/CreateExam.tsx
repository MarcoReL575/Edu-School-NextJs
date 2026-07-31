import { redirect } from 'next/navigation';
import { IconSettings } from '@tabler/icons-react'
import FormCreateExam from './FormCreateExam';
import { teacherService } from '../../teachers/services/teacherService';
import { requireAuth } from '@/src/lib/auth-server';
import { TeachersClases } from '../../teachers/types/types'

type Props = {
    clases: TeachersClases[];
}

export default async function CreateExam({ clases }: Props) {

    const { session } = await requireAuth();
    if(session.user.role !== 'maestro') redirect('/auth/signin')
    const { teacher } = await teacherService.getTeacherByUserId(session.user.id);

  return (
    <>
        <section className='border flex flex-col border-gray-400 rounded-lg p-4 w-full'>
            <div className='flex items-center gap-x-2'>
                <span>
                    <IconSettings />
                </span>
                <p>Configuración Inicial</p>
            </div>
            <FormCreateExam clases={clases} teacherId={teacher.id} />
        </section>
    </>
  )
}
