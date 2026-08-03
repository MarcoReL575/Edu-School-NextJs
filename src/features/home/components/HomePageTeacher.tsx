import Heading from "@/src/shared/components/typography/Heading";
import { teacherService } from "../../teachers/services/teacherService";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import { IconArrowRight, IconClockHour3, IconNotes } from "@tabler/icons-react";
import { Button } from "@/src/shared/components/ui/button";
import Link from "next/link";


export default async function HomePageTeacher() {

    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');
    const { teacher } = await teacherService.getTeacherByUserId(session.user.id);
    const horariosToday = await teacherService.getActualHorarioTeacherClases(teacher.id);
    const {clases} = await teacherService.getTeachersClases(teacher.id);

    return (
        <div className="flex flex-col space-y-4 w-full max-w-4xl mx-auto">
            <section className="text-center">
                <Heading level={2}>¡Bienvenido, {teacher.name} {teacher.lastName}!</Heading>
            </section>
            <section>
                <div className=" flex items-center border rounded-lg p-4 w-fit space-x-4">
                    <div>
                        <span className="p-2 rounded-lg bg-gray-100 flex items-center justify-center"><IconNotes /></span>
                    </div>
                    <div>
                        <p className="text-xl font-semibold">Clases que impartes</p>
                        <p className="text-2xl text-center">{clases.length}</p>
                    </div>
                </div>
            </section>
            <section className="border-2 rounded-lg p-4 space-y-10">
                <div className="flex items-center space-x-4">
                    <div className="p-4 bg-blue-100 rounded-lg text-blue-600 flex items-center justify-center">
                        <span><IconClockHour3 size={30} /></span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">Horarios de clases de hoy</p>
                        <p>Tus sesiones impartidas programadas para el día de hoy</p>
                    </div>
                </div>
                <div>
                    {horariosToday?.length ? horariosToday.map((horario)=> (
                        <div key={horario.slug} className="flex items-center justify-between border border-gray-200 rounded-lg p-2">
                            <div>
                                <div className="flex space-x-4 items-center">
                                    <p className="text-xl font-semibold">{horario.subjectName}</p>
                                    <span className="bg-gray-200 p-2 rounded-lg text-sm font-semibold">{horario.grade} {horario.groupName}</span>
                                </div>
                                <div className=" capitalize text-gray-500">
                                    {horario.level}
                                </div>
                            </div>
                            <div className="md:flex items-center gap-2">
                                <div className="border p-2 rounded-lg">
                                    {horario.inicio} - {horario.fin}
                                </div>
                                <div>
                                    <Link href={`/dashboard/mis-clases/${horario.slug}`}>
                                        <Button className="flex space-x-2">Ver Grupo <IconArrowRight /></Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))  
                        :   <div className="text-center text-xl">
                                Hoy no tienes clases para impartir
                            </div>
                    }
                </div>
            </section>
        </div>
    );
}