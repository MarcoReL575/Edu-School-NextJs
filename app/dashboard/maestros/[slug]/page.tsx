import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IconArrowLeft } from '@tabler/icons-react';
import FormCreateNewTeacher from '@/src/features/teachers/components/FormCreateNewTeacher';
import { teacherService } from '@/src/features/teachers/services/teacherService'
import { requireAuth } from '@/src/lib/auth-server';
import Heading from '@/src/shared/components/typography/Heading';
import { Button } from '@/src/shared/components/ui/button';

type Props = {
    params: Promise<{ slug: string }>
}

export default async function EditPageInfoTeacher({ params }: Props) {
    const {session} = await requireAuth();
    if(!session.user) redirect('/auth/signin');
    const slug = (await params).slug;
    const { teacherInfo } = await teacherService.getTeacherInfo(slug);

  return (
    <section className='max-w-4xl w-full space-y-4 mx-auto'>
        <div className='flex items-center justify-start'>
            <Link href={'/dashboard/maestros'}>
                <Button><IconArrowLeft /> Regresar</Button>
            </Link>
        </div>
        <div>
            <Heading level={1} className='text-center'>Editar información del maestro</Heading>
        </div>
        <div>
            <FormCreateNewTeacher userId={session.user.id} teacherInfo={teacherInfo} />
        </div>
    </section>
  )
}
