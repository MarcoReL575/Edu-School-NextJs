import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cache } from 'react';
import { studentsService } from '../services/StudentsService';
import { getStudentsSubjectsAction } from '../actions/clasesAction';
import ClasesSectionGrid from './ClasesSectionGrid';
import { FullSession } from '@/src/lib/auth-server';

type Props = {
    session: FullSession
    
}

export default async function MisClasesStudentPage({ session }:Props) {

    const getQueryClient = cache(() => new QueryClient());
    const queryClient = getQueryClient();

    const infoStudent = await studentsService.getInfoStudentById(session.user.id);

    if (infoStudent.groupId === null) return <div>El alumno no cuenta con materias asignadas</div>

    await queryClient.prefetchQuery({
        queryKey: ['miSubjects', infoStudent.groupId],
        queryFn: async () => await getStudentsSubjectsAction(infoStudent.groupId!, infoStudent.id)
    })

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClasesSectionGrid groupId={infoStudent.groupId} studentId={infoStudent.id} />
            </HydrationBoundary>
        </>
    )
}
