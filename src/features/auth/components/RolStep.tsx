import Heading from "@/src/shared/components/typography/Heading";
import RoleCard from "./RoleCard";
import { IconSchool, IconShieldCheck, IconUser, IconUsersGroup } from "@tabler/icons-react";
import { useStepsForm } from "../store/stepsFormStore";
import ContinueButton from "./ContinueButton";


export default function RolStep() {

    const { role } = useStepsForm();


  return (
    <>
        <Heading level={2} className="w-full text-center">¿Cuál es tu rol en la escuela?</Heading>
        <div className="grid grid-cols-2 gap-5 w-full" >
           
            <RoleCard 
                title={'Alumno'} 
                description={'Accede a tus clases, tareas y calificaciones'} 
                selected={role === 'estudiante'}  
                icon={IconUser}
                role={'estudiante'}
            />
            <RoleCard 
                title={'Maestro'} 
                description={'Gestiona tus clases, alumnos y asignaciones'} 
                selected={role === 'maestro'}  
                icon={IconSchool}
                role={'maestro'}
            />
            <RoleCard 
                title={'Padre / Tutor'} 
                description={'Sigue el progreso académico de tu(s) hijo(s)'} 
                selected={role ==='tutor'}  
                icon={IconUsersGroup}
                role={'tutor'}
            />
            <RoleCard 
                title={'Administrador'} 
                description={'Control total del sistema escolar'} 
                selected={role === 'admin'}  
                icon={IconShieldCheck}
                role={'admin'}
            />

        </div>
        <ContinueButton />
    </>
  )
}
