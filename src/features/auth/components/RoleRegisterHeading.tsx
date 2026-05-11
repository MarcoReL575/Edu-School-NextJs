import Heading from "@/src/shared/components/typography/Heading";
import { useStepsForm } from "../store/stepsFormStore";
import { IconSchool, IconShieldCheck, IconUser, IconUsersGroup } from "@tabler/icons-react";

export default function RoleRegisterHeading() {
  
    const { role } = useStepsForm();

    return (
        <Heading level={3} className=" border py-2 px-4 rounded-lg flex items-center justify-center gap-x-2 bg-yellow-100 sm:col-span-2">
            <span>Registrándote como:</span> 
            <span className="font-semibold">{role}</span>
            {role === 'estudiante' && <div className="border-2 border-black rounded-full p-1 flex items-center justify-center"><IconUser /></div>}
            {role === 'maestro' && <div className="border-2 border-black rounded-full p-1 flex items-center justify-center"><IconSchool /></div>}
            {role === 'tutor' && <div className="border-2 border-black rounded-full p-1 flex items-center justify-center"><IconUsersGroup /></div>}
            {role === 'admin' && <div className="border-2 border-black rounded-full p-1 flex items-center justify-center"><IconShieldCheck /></div>}
        </Heading>
    )
}
