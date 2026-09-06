import React from 'react'
import { getTutorChildrenAction } from '../../parents/actions/parentsActions'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/src/shared/components/ui/tabs';
import Heading from '@/src/shared/components/typography/Heading';
import { FullSession } from '@/src/lib/auth-server';
import GridStats from './GridStats';
import TableHorarioClases from '../../clases/components/TableHorarioClases';
import { clasesServices } from '../../clases/services/ClasesServices';

type Props = {
    session: FullSession;
}

export default async function HomePageTutor({ session }: Props) {

    const children = await getTutorChildrenAction();

    if (children.length === 0) {
        return (
            <>
                <Heading level={2}>Bienvenido(a), {session.user.name}</Heading>
                <p className="text-center mt-5">Aún no tienes hijos(as) vinculados a tu cuenta.</p>
            </>
        )
    }

    return (
        <section className='w-full mx-auto space-y-4'>
            <Heading level={2}>Bienvenido(a), {session.user.name}</Heading>
            {children.length === 1 ? (
                <StudentHomeContent studentId={children[0].id} groupId={children[0].groupId} />
            ) : (
                <Tabs defaultValue={children[0].id} className="flex-col space-y-2 mx-auto w-full max-w-3xl">
                    <TabsList variant="line" className='mx-auto border rounded-lg border-gray-600 bg-gray-100 p-2'>
                        {
                            children.map((child)=> (
                                <TabsTrigger key={child.id} value={child.id}>{child.name} {child.lastName}</TabsTrigger>
                            ))
                        }
                    </TabsList>
                    {
                        children.map((child)=> (
                            <TabsContent value={child.id} key={child.id}>
                               <StudentHomeContent studentId={child.id} groupId={child.groupId} />
                            </TabsContent>
                        ))
                    }
                </Tabs>
            )}
        </section>
  )
}

async function StudentHomeContent({ studentId, groupId }: { studentId: string; groupId: string }) {
    const horariosStudent = await clasesServices.getAllClasessByGroup(groupId);

    return (
        <div className='space-y-4'>
            <GridStats studentId={studentId} groupId={groupId} />
            <TableHorarioClases horariosStudent={horariosStudent} />
        </div>
    )
}
