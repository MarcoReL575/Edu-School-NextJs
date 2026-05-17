import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { studentsService } from '../services/StudentsService';
import { getStudentsSubjectsAction } from '../actions/clasesAction';
import { clasesServices } from '../services/ClasesServices';
import TableHorarioClases from './TableHorarioClases';
import ClasesSectionGrid from './ClasesSectionGrid';
import { FullSession } from '@/src/lib/auth-server';

type Props = {
    session: FullSession
    
}

export default async function MisClasesStudentPage({ session }:Props) {

    const queryClient = new QueryClient();

    const infoStudent = await studentsService.getInfoStudentById(session.user.id);

    if (infoStudent.groupId === null) return <div>El alumno no cuenta con materias asignadas</div>

    await queryClient.prefetchQuery({
        queryKey: ['miSubjects', infoStudent.groupId],
        queryFn: async () => await getStudentsSubjectsAction(infoStudent.groupId!)
    })

    const horariosStudent = await clasesServices.getAllClasessByGroup(infoStudent.groupId)

    return (
        <>
            <TableHorarioClases horariosStudent={horariosStudent} />
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ClasesSectionGrid groupId={infoStudent.groupId} />
            </HydrationBoundary>
        </>
    )
}
