import { redirect } from 'next/navigation';
import { requireAuth } from '@/src/lib/auth-server';
import TableHorarioClases from '../../clases/components/TableHorarioClases';
import { clasesServices } from '../../clases/services/ClasesServices';
import { studentsService } from '../../clases/services/StudentsService';
import MisClasesStudentPage from '../../clases/components/MisClasesStudentPage';

export default async function HomePageStudents() {

    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');

    const infoStudent = await studentsService.getInfoStudentById(session.user.id);
    const horariosStudent = await clasesServices.getAllClasessByGroup(infoStudent.groupId);


  return (
    <>
      <TableHorarioClases horariosStudent={horariosStudent} />
    </>
  )
}

