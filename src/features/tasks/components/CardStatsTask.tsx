import Heading from "@/src/shared/components/typography/Heading";
import { Icon, IconClipboard } from "@tabler/icons-react";
import clsx from "clsx";
import { ReactElement } from "react";
import { StatusTask } from "../types/types";

type Props = {
    title: string;
    status: StatusTask;
    icon: ReactElement;
    number: number;
}

export default function CardStatsTask({ title, status, icon, number}: Props) {
  return (
    <div className={clsx("border border-gray-400 rounded-lg p-4 space-y-2", {
        'bg-red-50 border-red-600': status === 'pendiente',
        'bg-yellow-50 border-yellow-600': status === 'en progreso',
        'bg-green-50 border-green-600':  status === 'terminada' 
    })}>
        <div className="flex items-center justify-between">
            <span className="p-2 rounded-lg bg-gray-300 text-white border-gray-400">
                {icon}
            </span>
            <span className={clsx("rounded-xl px-1 capitalize border-2", {
                'bg-red-100 text-red-600 border-red-600': status === 'pendiente',
                'bg-yellow-100 text-yellow-600 border-yellow-600': status === 'en progreso',
                'bg-green-100 text-green-600 border-green-600':  status === 'terminada' 
            })}>
                {status}
            </span>
        </div>
        <Heading level={4}>{title}</Heading>
        <p className="text-5xl text-center">
            {number}
        </p>
    </div>
  )
}
