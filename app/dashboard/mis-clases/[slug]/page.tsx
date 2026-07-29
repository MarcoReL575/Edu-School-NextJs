import Link from "next/link";
import { redirect } from "next/navigation";
import { IconArrowLeft, IconChartBarPopular, IconUser } from "@tabler/icons-react";
import { studentsService } from "@/src/features/clases/services/StudentsService";
import TabsInfoSubject from "@/src/features/mis-clases/components/TabsInfoSubject";
import { teacherService } from "@/src/features/teachers/clases/teacherService"
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";
import { GridTabsInfoClass } from "@/src/features/mis-clases/components/GridTabsInfoClass";
import clsx from "clsx";
import { CircleDivideIcon } from "lucide-react";

type Props = {
    params: Promise<{ slug: string }>
}

export default async function ClasePage({ params }: Props) {
    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');
    const role = session.user.role;

    const { id: studentId } = await studentsService.selectStudent(session.user.id) ?? 'null';
    const { slug } = await params;
    const { subjectName, grade, group, level, id: claseId, teacherName, teacherLastName, groupId, finalScore } = await teacherService.getAllInfoClase(slug);
    const studentsInGroup = await studentsService.getStudentsInGroup(groupId);
    const finalScoreClass= +finalScore

  return (
    <>
        <section className="grid grid-cols-4 gap-4">
            <Link href={'/dashboard/mis-clases'}>
                <Button variant={'outline'} className="flex items-center gap-x-2">
                    <IconArrowLeft />
                    Volver a clases
                </Button>
            </Link>
            <div className='col-span-2 flex flex-col items-center justify-center'>
                <Heading level={2} className="text-center">Materia: {subjectName}</Heading> 
                <div>
                    <p className="flex items-center gap-x-2">
                        <IconUser />
                        Prof(a): {teacherLastName} {teacherName}
                    </p>
                    <p className="mx-auto text-center">
                        Grupo: {grade} {group} {level}
                    </p>
                </div>
            </div>
            <div>
                <div className={clsx("py-4 rounded-lg text-white border border-gray-500 text-center flex items-center justify-around",
                    finalScoreClass >= 7 ? 'bg-green-300' : 'bg-red-600'
                )}>
                    <div>
                        <IconChartBarPopular size={40} />
                    </div>
                    <div>
                        <p>Promedio</p> 
                        <p className="text-center">{finalScore}</p>
                    </div>
                </div>
            </div>
        </section>
        {
            role === 'maestro' && <GridTabsInfoClass data={studentsInGroup as []} />
        }
        {
            role === 'estudiante' && studentId &&
            <section>
                <TabsInfoSubject subjectName={subjectName} studentId={studentId} groupId={groupId} claseId={claseId} finalScore={finalScore} />
                <div>{}</div>
            </section>
        }
    </>
  )
}
