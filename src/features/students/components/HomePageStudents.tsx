import { redirect } from 'next/navigation';
import { requireAuth } from '@/src/lib/auth-server';
import TableHorarioClases from '../../clases/components/TableHorarioClases';
import { clasesServices } from '../../clases/services/ClasesServices';
import { studentsService } from '../../clases/services/StudentsService';
import Heading from '@/src/shared/components/typography/Heading';
import { IconBook2, IconCalendarCheck, IconChecklist, IconUserCheck } from '@tabler/icons-react';
import CardStatsHome from '../../home/components/cardStatsHome';
import { taskService } from '../../tasks/services/taskService';
import { attendanceService } from '../../attendance/services/attendanceService';

export default async function HomePageStudents() {

  const { session } = await requireAuth();
  if(!session.user) redirect('/auth/signin');

  const infoStudent = await studentsService.getInfoStudentById(session.user.id);
  const horariosStudent = await clasesServices.getAllClasessByGroup(infoStudent.groupId);
  const todayDate = new Date()
  const { tasks } = await taskService.getAllTasks(infoStudent.groupId, infoStudent.id);
  const taskPendientes = tasks.filter((task)=> task.taskStatus === 'pendiente').length;
  const { attendances } = await attendanceService.getAttendancesByStudentId(infoStudent.id);
  const attendanceTotal = attendances.length;
  const attendancesTrue = attendances.filter((attendance)=> attendance.status === 'asistencia').length;
  const attendancePercentage= (attendancesTrue*100) / attendanceTotal;

  return (
    <>
      <section className='py-4 flex items-center justify-between'>
        <div>
          <Heading level={2}>¡Hola de nuevo, {}!</Heading>
          <p>Estudiante de. Revisa tus pendientes para el día de hoy</p>
        </div>
        <div className='border border-gray-200 flex items-center justify-center p-4 gap-x-2 rounded-lg text-sm'>
          <IconUserCheck />
          <div>
            <p className='font-semibold'>Perfil Estudiante</p>
            <p>Acceso Autorizado</p>
          </div>
        </div>
      </section>
      <section>
        <TableHorarioClases horariosStudent={horariosStudent} />
      </section>
      <section className='grid grid-cols-3 sm:grid-cols-3 gap-4'>
        <CardStatsHome titleCard='promedio general' content={8.9} icon={<IconBook2 size={20}/>} />
        <CardStatsHome titleCard='asistencia total' content={attendancePercentage} icon={<IconCalendarCheck size={20} />} />
        <CardStatsHome titleCard='tareas pendientes' content={taskPendientes} icon={<IconChecklist size={20} />} />
      </section>
    </>
  )
}
