import Heading from "@/src/shared/components/typography/Heading";
import { Icon, IconCheck } from "@tabler/icons-react";
import clsx from "clsx";
import { useStepsForm } from "../store/stepsFormStore";
import { role } from "../types/auth-types";

type Props = {
    title: string;
    description: string;
    selected: boolean;
    icon: Icon;
    role: role;
}

export default function RoleCard({description, icon: Icon,  role: rolecard, selected, title}: Props) {

    const { setRole, role } = useStepsForm()
    console.log(role)

  return (
    <div 
        className={clsx('border-2 rounded-lg p-4 hover:-translate-y-2 transition-all ease-in duration-300 cursor-pointer',
            selected && 'bg-green-100 border-green-600'
        )}
        onClick={()=> setRole(rolecard)}
    >
        <div className="flex justify-end">
            <span className={clsx('rounded-full flex items-center justify-center text-white p-0.5',
                selected && 'bg-green-600'
            )}>
                <IconCheck size={18} />
            </span>
        </div>
        <div className="flex items-center gap-x-4">
            <span className="rounded-full border border-black p-2 flex items-center justify-center w-fit">
                <Icon />
            </span>
            <Heading level={5} className="font-semibold">{title}</Heading>
        </div>
        <p className="text-sm text-gray-500">{description}</p>
        <span className={clsx('font-semibold text-sm px-2 py-1 rounded-lg capitalize', 
            selected && 'bg-green-300 '
        )}>
            {rolecard}
        </span>
    </div>
  )
}
