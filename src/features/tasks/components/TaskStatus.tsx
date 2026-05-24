'use client'

import { useState } from "react";
import { useTasksStore } from "../store/useTasksStore";
import { IconClipboardList } from "@tabler/icons-react";

export default function TaskStatus() {

    const statusTask = useTasksStore((state)=> state.statusTask);

  return (
    <p className={`flex items-center gap-x-2 ${statusTask === 'terminada' ? 'text-green-500': 'text-red-500'}`}>
        <IconClipboardList size={25} />
        <span>{statusTask === 'terminada' ? 'Terminada': 'Pendiente'}</span>
    </p>
  )
}
