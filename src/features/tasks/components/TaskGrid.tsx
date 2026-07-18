import { IconChecklist, IconClipboardOff, IconClipboardText } from "@tabler/icons-react";
import { studentsService } from "../../clases/services/StudentsService";
import { getTasksWithDetailsAction } from "../actions/tasksAction"
import CardStatsTask from "./CardStatsTask";
import FilterTasks from "./FilterTasks";
import { FiltesrsSection } from "./FiltersSection";


type Props = {
    userId: string;
}

export default async function TaskGrid({ userId }: Props) {
    const userInfo = await studentsService.selectStudent(userId);
    const { success, message, tasks } = await getTasksWithDetailsAction(userInfo.groupId, userInfo.id);
    if(!success) return <div>El alumno no cuenta con tareas asignadas</div>
    
    const pending = tasks.filter((task)=> task.taskStatus === 'pendiente' || task.taskStatus === null);
    const inProgress = tasks.filter((task)=> task.taskStatus === 'entregada');
    const finished = tasks.filter((task)=> task.taskStatus === 'calificada');

    return (
        <main className="flex flex-col space-y-10">
            <section className="grid grid-cols-2 lg:grid-cols-3 gap-4" >
                <CardStatsTask title="Tareas Pendientes" status="pendiente" icon={<IconClipboardOff />} number={pending.length} />
                <CardStatsTask title="Tareas Entregadas" status="entregada" icon={<IconClipboardText />} number={inProgress.length}/>
                <CardStatsTask title="Tareas Calificadas" status="calificada" icon={<IconChecklist />} number={finished.length} />
            </section>
            <FiltesrsSection />
            <section className="grid 2xl:grid-cols-2 gap-4">
                <FilterTasks taskList={tasks} />
            </section>
        </main>
    )
}
