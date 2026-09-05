import Link from "next/link";
import { redirect } from "next/navigation";
import { IconArrowLeft, IconChartBarPopular, IconUser } from "@tabler/icons-react";
import clsx from "clsx";
import { studentsService } from "@/src/features/students/services/StudentsService";
import TabsInfoSubject from "@/src/features/mis-clases/components/TabsInfoSubject";
import { teacherService } from "@/src/features/teachers/services/teacherService"
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";
import { GridTabsInfoClass } from "@/src/features/mis-clases/components/GridTabsInfoClass";
import { getTutorChildrenAction } from "@/src/features/parents/actions/parentsActions";

type Props = {
    params: Promise<{ slug: string }>
}

export default async function ClasePage({ params }: Props) {
    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');
    const role = session.user.role;

    const { id: studentId  } = await studentsService.selectStudent(session.user.id) ?? 'null';
    const { slug } = await params;
    const { subjectName, grade, group, level, id: claseId, teacherName, teacherLastName, groupId, finalScore } = await teacherService.getAllInfoClase(slug);
    const studentsInfo = await studentsService.getListStudentsWithScores(groupId, claseId)
    const finalScoreClass = finalScore !== null ? +finalScore : 0

    let tutorStudentId: string | undefined;
    if (role === 'tutor') {
        const children = await getTutorChildrenAction();
        tutorStudentId = children.find((child) => child.groupId === groupId)?.id;
    }

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
                <div className={clsx("py-2 rounded-lg text-white border border-gray-500 text-center flex items-center justify-around",
                    finalScoreClass >= 7 ? 'bg-green-300' : 'bg-red-600',
                    finalScore === null && 'bg-blue-300' ,
                )}>
                    <div>
                        <IconChartBarPopular size={40} />
                    </div>
                    <div>
                        <p className=" text-xl font-semibold">Promedio Final</p> 
                        <p className="text-center text-2xl font-bold">{finalScore}{finalScore === null && '--' }</p>
                    </div>
                </div>
            </div>
        </section>
        {
            role === 'maestro' && <GridTabsInfoClass data={studentsInfo as []} claseId={claseId} />
        }
        {
            role === 'estudiante' && studentId &&
            <section>
                <TabsInfoSubject subjectName={subjectName} studentId={studentId} groupId={groupId} claseId={claseId} finalScore={finalScoreClass} />
            </section>
        }
        {
            role === 'tutor' && tutorStudentId &&
            <section>
                <TabsInfoSubject subjectName={subjectName} studentId={tutorStudentId} groupId={groupId} claseId={claseId} finalScore={finalScoreClass} />
            </section>
        }
    </>
  )
}