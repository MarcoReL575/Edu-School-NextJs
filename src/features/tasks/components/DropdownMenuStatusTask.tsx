'use client'

import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast";
import { changeStatusTaskAction } from "../actions/tasksAction";
import { StatusTask } from "../types/types";

type Props = {
  taskId: number;
}

export function DropdownMenuStatusTask({ taskId }: Props) {

  const [ statusTask, setStatusTask ]= useState('');

  const handleChangeStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { success, message } = await changeStatusTaskAction(taskId, e.target.value as StatusTask);
    if(!success) {
      toast.error(message);
    }
    if(success){
      toast.success(message);
      setStatusTask('');
      redirect('/dashboard/tareas');
    }
  }

  return (
    <select 
      className="border border-gray-300 rounded-lg p-2 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
      onChange={handleChangeStatus }
      value={statusTask}
    >
      <option value="">Modificar Status</option>
      <option value="pendiente">Pendiente</option>
      <option value="en progreso">En Progreso</option>
      <option value="terminada">Entregada</option>
    </select>
  )
}
