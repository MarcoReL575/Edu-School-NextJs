import Heading from "@/src/shared/components/typography/Heading";
import { TaskDetails } from "../types/types"
import { IconCalendar, IconClipboardList } from "@tabler/icons-react";
import { getCorrectDate } from "../helpers/getCorrectDate";
import clsx from "clsx";
import ButtonOpenModal from "@/src/shared/components/ButtonOpenModal";
import TaskStatus from "./TaskStatus";

type Props = {
  task: TaskDetails;
}

export default async function TaskCard({ task }: Props) {
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
      
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-x-2 font-semibold">
          <IconCalendar size={25} />{getCorrectDate(task.taskFechaEntrega)}
        </p>
        <TaskStatus />
      </div>
    
    </div>
  )
}
