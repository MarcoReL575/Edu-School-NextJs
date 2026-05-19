import Heading from "@/src/shared/components/typography/Heading";
import { TaskDetails } from "../types/types"
import { IconCalendar, IconClipboardList } from "@tabler/icons-react";
import { getCorrectDate } from "../helpers/getCorrectDate";
import clsx from "clsx";
import { DropdownMenuStatusTask } from "./DropdownMenuStatusTask";

type Props = {
  task: TaskDetails;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <Heading level={3} className="text-sm text-gray-500">{task.subjectName}</Heading>
        <DropdownMenuStatusTask taskId={task.taskId} />
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
        <p className={clsx('flex items-center gap-x-2 capitalize font-semibold',
          task.taskStatus === 'pendiente' && 'text-red-500',
          task.taskStatus === 'en progreso' && 'text-yellow-500',
          task.taskStatus === 'terminada' && 'text-green-500'
        )}>
          <IconClipboardList size={25} />{task.taskStatus}
        </p>
      </div>
    
    </div>
  )
}
