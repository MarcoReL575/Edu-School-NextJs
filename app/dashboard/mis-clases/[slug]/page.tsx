import { clasesServices } from "@/src/features/clases/services/ClasesServices";
import { studentsService } from "@/src/features/clases/services/StudentsService";
import TabsInfoSubject from "@/src/features/mis-clases/components/TabsInfoSubject";
import { teacherService } from "@/src/features/teachers/clases/teacherService"
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";
import { IconArrowLeft, IconClockHour3, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>
}

export default async function ClasePage({ params }: Props) {
    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');

    const { id: studentId } = await studentsService.selectStudent(session.user.id);
    const { slug } = await params;
    const { subjectName, grade, group, level, id: claseId, teacherName, teacherLastName, groupId } = await teacherService.getAllInfoClase(slug);
    const horariosList = await clasesServices.getHorarios(claseId);
    
  return (
    <>
        <section>
            <Link href={'/dashboard/mis-clases'}>
                <Button variant={'outline'} className="flex items-center gap-x-2">
                    <IconArrowLeft />
                    Volver a clases
                </Button>
            </Link>
            <section>
                <Heading level={2} className="text-center">Materia: {subjectName}</Heading> 
            </section>
        </section>
        <section className="mx-auto text-gray-500">
            <p className="flex items-center gap-x-2">
                <IconUser />
                Prof(a): {teacherLastName} {teacherName}
            </p>
            <p className="mx-auto text-center">
                Grupo: {grade} {group} {level}
            </p>
        </section>
        <section className="grid grid-cols-1 max-w-2xl gap-4 mx-auto w-full">
            <div className="flex flex-col gap-y-4 rounded-lg bg-gray-50 items-center justify-center py-4 border-2 border-gray-400">
                <p className="flex items-center gap-x-2"><IconClockHour3/><span>Horarios</span></p>
                {
                    horariosList.length 
                    ?   horariosList.map((horario)=> (
                            <p key={horario.id} className="p-2 capitalize bg-white w-xs flex items-center justify-between rounded-lg border-2 border-gray-300">
                            <span> {horario.dayOfWeek === 'miercoles' ? 'miércoles': horario.dayOfWeek}</span> <span>{horario.startTime}-{horario.endTime}</span>
                            </p>
                        ))
                    : <p>Aún no hay horarios para esta clase</p>
                }
            </div>
        </section>
        <section>
            <TabsInfoSubject subjectName={subjectName} studentId={studentId} groupId={groupId} />
        </section>
    </>
  )
}
