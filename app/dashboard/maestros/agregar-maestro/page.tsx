import FormCreateNewTeacher from '@/src/features/teachers/components/FormCreateNewTeacher'
import { requireAuth } from '@/src/lib/auth-server'
import Heading from '@/src/shared/components/typography/Heading'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AddNewTechaerPage() {

    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');

  return (
    <section className='w-full max-w-4xl mx-auto space-y-4'>
        <div>
            <Heading level={2}>Añade un nuevo maestro</Heading>
            <p className='text-gray-500'>Estas por crear un nuevo maestro, asegúrate de llenar los datos correctamente</p>
        </div>
        <FormCreateNewTeacher userId={session.user.id} />
    </section>
  )
}
