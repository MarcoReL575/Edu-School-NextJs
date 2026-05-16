import { TaskDetails } from "../types/types"

type Props = {
    task: TaskDetails;
}

export default function TaskCard({ task }: Props) {
  return (
    <div>{task.taskTitle} - {task.taskDescription}</div>
  )
}
