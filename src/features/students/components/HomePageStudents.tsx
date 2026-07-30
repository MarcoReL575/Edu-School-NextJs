import { redirect } from 'next/navigation';
import { requireAuth } from '@/src/lib/auth-server';
import { IconBook2, IconCalendarCheck, IconChecklist, IconUserCheck } from '@tabler/icons-react';
import TableHorarioClases from '../../clases/components/TableHorarioClases';
import { clasesServices } from '../../clases/services/ClasesServices';
import { studentsService } from '../../clases/services/StudentsService';
import Heading from '@/src/shared/components/typography/Heading';
import CardStatsHome from '../../home/components/cardStatsHome';
import { taskService } from '../../tasks/services/taskService';
import { misclasesService } from '../../mis-clases/services/misclasesService';

export default async function HomePageStudents() {

  const { session } = await requireAuth();
  if(!session.user) redirect('/auth/signin');

  const infoStudent = await studentsService.getInfoStudentById(session.user.id);
  const horariosStudent = await clasesServices.getAllClasessByGroup(infoStudent.groupId);
  const todayDate = new Date()
  const { success, message, tasks } = await taskService.getAllTasks(infoStudent.groupId, infoStudent.id);
  const taskPendientes = tasks.filter((task)=> task.taskStatus === 'pendiente' || task.taskStatus === null).length;
  const metricsStudents = await misclasesService.getStudentMetrics(infoStudent.id);
  console.log(tasks)

  return (
    <>
      <section className='py-4 flex items-center justify-between'>
        <div>
          <Heading level={2}>¡Hola de nuevo, {infoStudent.name} {infoStudent.lastName}!</Heading>
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
      <section className='grid grid-cols-3 sm:grid-cols-3 gap-4'>
        <CardStatsHome titleCard='promedio general' content={metricsStudents.globalAverage} icon={<IconBook2 size={20}/>} />
        <CardStatsHome titleCard='asistencia total' content={metricsStudents.attendancePercentage} icon={<IconCalendarCheck size={20} />} />
        <CardStatsHome titleCard='tareas pendientes' content={taskPendientes} icon={<IconChecklist size={20} />} />
      </section>
      <section>
        <TableHorarioClases horariosStudent={horariosStudent} />
      </section>
    </>
  )
}
