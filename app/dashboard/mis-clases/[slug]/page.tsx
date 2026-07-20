import Link from "next/link";
import { redirect } from "next/navigation";
import { IconArrowLeft, IconUser } from "@tabler/icons-react";
import { studentsService } from "@/src/features/clases/services/StudentsService";
import TabsInfoSubject from "@/src/features/mis-clases/components/TabsInfoSubject";
import { teacherService } from "@/src/features/teachers/clases/teacherService"
import { requireAuth } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";
import { GridTabsInfoClass } from "@/src/features/mis-clases/components/GridTabsInfoClass";

type Props = {
    params: Promise<{ slug: string }>
}

export default async function ClasePage({ params }: Props) {
    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');
    const role = session.user.role;

    const { id: studentId } = await studentsService.selectStudent(session.user.id) ?? 'null';
    const { slug } = await params;
    const { subjectName, grade, group, level, id: claseId, teacherName, teacherLastName, groupId } = await teacherService.getAllInfoClase(slug);
    const studentsInGroup = await studentsService.getStudentsInGroup(groupId);

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
        {
            role === 'maestro' && <GridTabsInfoClass data={studentsInGroup as []} />
        }
        {
            role === 'estudiante' && studentId &&
            <section>
                <TabsInfoSubject subjectName={subjectName} studentId={studentId} groupId={groupId} claseId={claseId} />
            </section>
        }
    </>
  )
}
