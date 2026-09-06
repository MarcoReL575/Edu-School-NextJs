import React from 'react'
import CardStatsHome from './cardStatsHome'
import { IconBook2, IconCalendarCheck, IconChecklist } from '@tabler/icons-react'
import { taskService } from '../../tasks/services/taskService'
import { misclasesService } from '../../mis-clases/services/misclasesService'

type Props = {
    studentId: string;
    groupId: string;
}

export default async function GridStats({studentId, groupId}: Props) {

    const { tasks } = await taskService.getAllTasks(groupId, studentId);
    const pendingTasks = tasks.filter((task)=> task.taskStatus === 'pendiente' || task.taskStatus === null).length;

    const metrics = await misclasesService.getStudentMetrics(studentId);

  return (
    <section className='grid grid-cols-3 gap-4'>
        <CardStatsHome titleCard='Promedio General' content={metrics.globalAverage} icon={<IconBook2 />} />
        <CardStatsHome titleCard='Asistencia Total' content={metrics.attendancePercentage} icon={<IconCalendarCheck />} />
        <CardStatsHome titleCard='Tareas pendientes' content={pendingTasks} icon={<IconChecklist />} />
    </section>
  )
}
