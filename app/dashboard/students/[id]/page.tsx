import { students } from "@/src/db/schema";
import { groupService } from "@/src/features/clases/services/GroupService";
import { studentsService } from "@/src/features/students/services/StudentsService";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
}

export default async function StudentPage({ params }: Props) {
  
  const { id } = await params;

  const { student, group } = await studentsService.getInfoStudentAndGroup(id);
  
  return (
    <>
      <div>
        <div>
          <p>Nombre Alumno: {student.lastName} {student.name}</p>
          <p>Grado y Grupo: {group.grade} {group.group} {group.level}</p>
        </div>
        <div>
          Matrícula: {student.matricula}
        </div>
      </div>
    </>
  )
}
