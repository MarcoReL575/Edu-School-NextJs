'use client'

import { Button } from "@/src/shared/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import { IconChevronDown, IconPencil } from "@tabler/icons-react"
import { ChangeEvent, useState } from "react"

export function DropdownMenuStatusTask() {

  const [statusTask, setStatusTask] = useState('');

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setStatusTask(e.target.value);
    console.log(statusTask);
  }

  return (
    <select 
      className="border border-gray-300 rounded-lg p-2 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
      onChange={handleChangeStatus }
    >
      <option value="">Modificar Status</option>
      <option value="pendiente">Pendiente</option>
      <option value="en progreso">En Progreso</option>
      <option value="terminada">Entregada</option>
    </select>
  )
}
