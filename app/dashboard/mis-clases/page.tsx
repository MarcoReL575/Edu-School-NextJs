
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStudentsSubjectsAction } from "@/src/features/clases/actions/clasesAction";
import ClasesSectionGrid from "@/src/features/clases/components/ClasesSectionGrid";
import TableHorarioClases from "@/src/features/clases/components/TableHorarioClases";
import { clasesServices } from "@/src/features/clases/services/ClasesServices";
import { studentsService } from "@/src/features/clases/services/StudentsService";
import { requireAuth } from "@/src/lib/auth-server"

export const metadata: Metadata = {
  title: 'Edu-School: Mis Clases'
};


export default async function MisClases() {
  const { session } = await requireAuth();
  if(!session) redirect('/auth/signin');

  const queryClient = new QueryClient();

  const infoStudent = await studentsService.getInfoStudentById(session.user.id);
  console.log(infoStudent)
  
  if(infoStudent.groupId === null) return <div>El alumno no cuenta con materias asignadas</div>

  await queryClient.prefetchQuery({
    queryKey: ['miSubjects', infoStudent.groupId],
    queryFn: async()=> await getStudentsSubjectsAction(infoStudent.groupId!)
  })

  const horariosStudent = await clasesServices.getAllClasessByGroup(infoStudent.groupId)
  console.log(horariosStudent);

  return (
    <div className="flex flex-col space-y-4 max-w-6xl mx-auto">
      <TableHorarioClases horariosStudent={horariosStudent} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClasesSectionGrid groupId={infoStudent.groupId} />
      </HydrationBoundary>
    </div>
  )
}


