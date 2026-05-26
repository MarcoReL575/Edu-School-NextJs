import { IconChecklist, IconClipboardOff, IconClipboardText } from "@tabler/icons-react";
import { studentsService } from "../../clases/services/StudentsService";
import { getTasksWithDetailsAction } from "../actions/tasksAction"
import CardStatsTask from "./CardStatsTask";
import TaskCard from "./TaskCard";

type Props = {
    userId: string;
}

export default async function TaskGrid({ userId }: Props) {

    const userInfo = await studentsService.selectStudent(userId);
    const { success, message, data: taskList } = await getTasksWithDetailsAction(userInfo.groupId, userInfo.id);
    if(!success) return <div>El alumno no cuenta con tareas asignadas</div>
    
    const pending = taskList.filter((task)=> task.taskStatus === 'pendiente' || task.taskStatus === null);
    const inProgress = taskList.filter((task)=> task.taskStatus === 'entregada');
    const finished = taskList.filter((task)=> task.taskStatus === 'calificada');

    return (
        <main className="flex flex-col space-y-4">
            <section className="grid grid-cols-2 lg:grid-cols-3 gap-4" >
                <CardStatsTask title="Tareas Pendientes" status="pendiente" icon={<IconClipboardOff />} number={pending.length} />
                <CardStatsTask title="Tareas Entregadas" status="entregada" icon={<IconClipboardText />} number={inProgress.length}/>
                <CardStatsTask title="Tareas Calificadas" status="calificada" icon={<IconChecklist />} number={finished.length} />
            </section>
            <section className="grid 2xl:grid-cols-2 gap-4">
                {taskList && taskList.map((task)=> (
                    <TaskCard key={task.taskId} task={task} />
                ))}
            </section>
        </main>
    )
}
