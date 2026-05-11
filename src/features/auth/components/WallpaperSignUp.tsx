import Heading from "@/src/shared/components/typography/Heading";
import { IconSchool, IconShieldCheck, IconUser, IconUsersGroup } from "@tabler/icons-react";
import RoleCardEduSchool from "./RoleCardEduSchool";
import Link from "next/link";


export default function WallpaperSignUp() {
  return (
    <section className=" space-y-4">
        <div className="flex items-center gap-x-2 mb-10">
            <span className="p-2 bg-blue-500 flex items-center justify-center w-fit rounded-lg">
                <IconSchool className="text-white" />
            </span>
            <Heading level={3}>EduSchool</Heading>
        </div>
        <div className="text-6xl font-semibold">
            <p>Tu espacio</p>
            <p>educativo</p>
            <p className="text-blue-500">inteligente</p>
        </div>
        <div className="text-gray-500 text-lg mt-5">
            <p>Una plataforma diseñada para conectar a toda la </p>
            <p>comunidad escolar en un solo lugar</p>
        </div>
        <div className="space-y-4">
            <RoleCardEduSchool role="Alumno" description="Horarios, tareas, calificaciones y más" icon={IconUser} />
            <RoleCardEduSchool role="Maestros" description="Gestión de clases y alumnos" icon={IconSchool} />
            <RoleCardEduSchool role="Padres" description="Seguimiento académico del hijo" icon={IconUsersGroup} />
            <RoleCardEduSchool role="Administradores" description="Control total del sistema" icon={IconShieldCheck} />
        </div>
        <div>
            <p className="flex gap-x-2 text-center justify-center items-center">
                ¿Ya tienes una cuenta?.
                <Link
                    href={'/auth/signin'}
                    className="text-blue-500 underline"
                >Inicia sesión</Link>
            </p>
            <p className="flex gap-x-2 text-center justify-center items-center">
                ¿Aún no tienes una cuenta?.
                    <Link
                    href={'/auth/signup'}
                    className="text-blue-500 underline"
                    >Crea una sesión</Link>
                </p>
            </div>
    </section>
  )
}
