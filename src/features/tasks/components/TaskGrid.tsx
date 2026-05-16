import { studentsService } from "../../clases/services/StudentsService";
import { getTasksWithDetailsAction } from "../actions/tasksAction"
import TaskCard from "./TaskCard";

type Props = {
    userId: string;
}

export default async function TaskGrid({ userId }: Props) {

    const userInfo = await studentsService.studentsExists(userId)
    const { success, message, data: taskList } = await getTasksWithDetailsAction(userInfo.groupId);
    if(!success) return <div>El alumno no cuenta con tareas asignadas</div>

    return (
        <section className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {taskList && taskList.map((task)=> (
                <TaskCard key={task.id} task={task} />
            ))}
        </section>
    )
}
