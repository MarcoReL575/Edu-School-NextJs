'use client'

import { IconClipboardList } from "@tabler/icons-react";
import { SubmitTaskStatus } from "../types/types";
import clsx from "clsx";

type Props = {
  statusTask: SubmitTaskStatus
}

export default function TaskStatus({ statusTask }: Props) {
  return (
    <p className={clsx('flex items-center gap-x-2', 
      statusTask?? 'text-red-500',
      statusTask === 'pendiente' && 'text-red-500',
      statusTask === 'entregada' && 'text-yellow-500',
      statusTask === 'calificada' && 'text-green-500',
    )}>
      <IconClipboardList size={25} />
      <span className=" capitalize">{statusTask?? 'pendiente'}</span>
    </p>
  )
}
