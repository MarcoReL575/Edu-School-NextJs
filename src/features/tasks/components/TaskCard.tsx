import Heading from "@/src/shared/components/typography/Heading";
import { TaskDetails } from "../types/types"
import { IconCalendar } from "@tabler/icons-react";
import ButtonOpenModal from "@/src/shared/components/ButtonOpenModal";
import TaskStatus from "./TaskStatus";
import { getCorrectDate } from "../helpers/getCorrectDate";


type Props = {
  task: TaskDetails;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <Heading level={3} className="text-sm text-gray-500">{task.subjectName}</Heading>
        <ButtonOpenModal nameModal="modalSubmittedTask" nameButton="Enviar tarea" taskId={task.taskId} />
      </div>
      <Heading level={4}>{task.taskTitle}</Heading>
      
      <div className="text-gray-500">
        <p>Descripción: </p>
        <p>{task.taskDescription}</p>
      </div>
      
      <div className="text-gray-400 border my-4" />
      
      <div className={`items-center justify-between w-full h-15 flex `}>
        { task.taskStatus !== 'calificada' && 
          <>
            <p className="flex items-center gap-x-2 font-semibold">
              <IconCalendar size={25} />{getCorrectDate(task.taskFechaEntrega)}
            </p>
            <TaskStatus statusTask={task.taskStatus} />
          </>
        }
        { task.taskStatus === 'calificada' && 
          <>
            <div className="">
              <div>
                <span>Calificación:</span>
                <span>{task.taskGrade}</span>
              </div>
              <div className="flex gap-x-2">
                <p>Comentarios:</p>
                <p className="text-gray-500">{task.taskFeedback}</p>
              </div>
            </div>
            <div>
              <TaskStatus statusTask={task.taskStatus} />
            </div>
          </>
        }
      </div>
    </div>
  )
}
