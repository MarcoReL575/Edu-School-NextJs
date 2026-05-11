import clsx from "clsx";

type Props = {
  name: string;
  description: string;
  status: 'complete' | 'pending' | 'notcompleted'
}

export default function CardsTareas({ name, status, description }: Props) {
  return (
    <div className={clsx("rounded-lg font-semibold flex flex-col justify-center px-2 py-0.5 text-xs",
      status === "complete" && 'bg-green-200 text-green-500',
      status === "notcompleted" && 'bg-red-200 text-red-500',
      status === "pending" && 'bg-yellow-200 text-yellow-500',
    )}>
        <p>{name}: {description}</p>
    </div>
  )
}