'use client'

import { useQueryState } from 'nuqs';
import { TaskDetails } from '../types/types';
import TaskCard from './TaskCard'

type Props = {
    taskList: TaskDetails[]
}

export default function FilterTasks({ taskList } : Props) {
    const [filter] = useQueryState('filter');
    console.log(filter)

    const filteredTasks = taskList.filter((task) => {
        if (filter === 'pendientes') return task.taskStatus === 'pendiente' || task.taskStatus === null;
        if (filter === 'entregadas') return task.taskStatus === 'entregada';
        if (filter === 'calificadas') return task.taskStatus === 'calificada';
        return true; // Si es 'all' o null
    });

  return (
    <>
        {filteredTasks && filteredTasks.map((task)=> (
            <TaskCard key={task.taskId} task={task} />
        ))}
    </>
  )
}
