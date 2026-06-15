import Heading from "@/src/shared/components/typography/Heading";
import MisClasesStudentPage from "../../clases/components/MisClasesStudentPage";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import TableStudentAttendance from "./TableStudentAttendance";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { studentsService } from "../../clases/services/StudentsService";
import { getAttendancesByStudentAction } from "../actions/attendanceActions";

export default async function PageStudentsAttendance() {

  const { session } = await requireAuth();
  if(!session.user) redirect('/auth/signin');

  const queryClient = new QueryClient();
  const student = await studentsService.selectStudent(session.user.id);

  await queryClient.prefetchQuery({
    queryKey: ['attendance-student', session.user.id],
    queryFn: ()=> getAttendancesByStudentAction(student.id),
  });

  return ( 
    <> 
      <Heading level={2}>En esta sección puedes llevar un control de tus asistencias.</Heading>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TableStudentAttendance studentId={student.id} />
      </HydrationBoundary>
    </>  
  )
}