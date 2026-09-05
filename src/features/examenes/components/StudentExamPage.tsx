import { studentsService } from "../../students/services/StudentsService"
import { examService } from "../services/examService"
import CardExamStudent from "./CardExamStudent";

type Props = {
    userId: string;
}

export default async function StudentExamPage({ userId }: Props) {
    const student = await studentsService.getInfoStudentById(userId);
    const examList = await examService.getStudentsExamsList(student.id, student.groupId);

  return (
    <>
        <section>

        </section>
        <section className="grid grid-cols-2 gap-4">
            {examList.length > 0 
                ?   examList.map((exam)=> (
                        <CardExamStudent key={exam.id} exam={exam} />
                    ))
                : <div className="w-full mx-auto py-10">Aún no hay examenes</div>
            }
        </section>
    </>
  )
}
