import Heading from "@/src/shared/components/typography/Heading";
import clsx from "clsx";

type Props = {
    title: 'pendientes' | 'entregadas' | 'calificadas' | 'promedio' | 'porcentaje'  ;
    value?: number;
    icon: React.ReactNode;
    description?: string;
}

export default function CardStatsSubmittedTasks({ title, value, icon, description }: Props) {
  return (
    <div className={clsx("p-4 rounded-lg border-2",
        title=== 'pendientes' && "bg-red-100 border-red-500 text-red-700",
        title=== 'entregadas' && "bg-green-100 border-green-500 text-green-700",
        title=== 'calificadas' && "bg-blue-100 border-blue-500 text-blue-700",
        title=== 'promedio' && "bg-purple-100 border-purple-500 text-purple-700",
        title=== 'porcentaje' && "bg-yellow-100 border-yellow-500 text-yellow-700"
    )}>
        <div className="flex items-center justify-between">
            <Heading level={3}>{title}</Heading>
            <div className="p-1.5 border-2 border-white rounded-full flex items-center justify-center">
                <span>{icon}</span>
            </div>
        </div>
        {value && <p className="text-2xl font-bold">{value}{title === 'porcentaje' && '%'}</p>}
        {description && <p>{description}</p>}
    </div>
  )
}
