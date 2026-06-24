'use client'

import { IconCalendar, IconTrash, IconUsers } from "@tabler/icons-react"
import { ExamSelectInfo } from "../types/types"
import { getCorrectDate } from "../../tasks/helpers/getCorrectDate"
import { Button } from "@/src/shared/components/ui/button"
import { deleteExamAction } from "../actions/examAction"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"
import Link from "next/link"

type Props = {
    exam: ExamSelectInfo
}

export default function CardExamTeacher({ exam }: Props) {

    const handleDeleteExam = async()=> {
        const { success, message } = await deleteExamAction(exam.id);
        if(!success) {
            toast.error(message);
        }
        if(success) {
            toast.success(message);
            redirect('/dashboard/examenes');
        }
    }

  return (
    <div className="border flex flex-col space-y-4 border-gray-400 rounded-lg p-4">
        <section className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
                <span className="bg-gray-200 p-2 rounded-lg">{exam.grade} {exam.group} {exam.level}</span>
                <span>{exam.subjectName}</span>
            </div>
            <div className="flex items-center gap-x-2">
               <span> {exam.status}</span>
               <Button variant={'destructive'} onClick={handleDeleteExam}><IconTrash /></Button>
            </div>
        </section>

        <section>
           <p className="text-xl font-semibold">{exam.title}</p>
           <p className="flex items-center gap-x-2 text-gray-500 text-sm">
                <span><IconCalendar size={20} /></span>
                <span>Creado el: {getCorrectDate(exam.createdAt)}</span>
           </p>
        </section>

        <section className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-x-2">
                <span><IconUsers /></span>
                <span>{exam.submittedCount}/{exam.totalStudents}</span>
            </div>
            <div className="flex items-center gap-x-2">
                <span>{exam.questionsCount}</span>
                <span>Preguntas</span>
            </div>
            <div className="flex items-center gap-x-2">
                <span>{exam.averageScore}%</span>
                <span>Promedio</span>
            </div>
            <Link href={`/dashboard/examenes/${exam.slug}/control`}>
                <Button variant={'outline'}>Ver más</Button>
            </Link>
        </section>
    </div>
  )
}
