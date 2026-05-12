import Link from "next/link"
import { TeachersClases } from "../types/types"
import { Route } from "next"

type Props = {
  clase: TeachersClases
}

export default function CardClasesTeacher({ clase }: Props) {
  return (
    <Link 
      className="rounded-lg bg-gray-50 border-2 border-gray-200 space-y-4 p-4 w-full"
      href={`/dashboard/mis-clases/${clase.id}` as Route}
    >
        <p>{clase.subjectName}</p>
        <p>{clase.grade} {clase.group} {clase.level}</p>
        <div className="text-sm text-gray-500 flex items-center justify-between">
            <span>Promedio: 8.3</span>
            <span>Alumnos: 32</span>
        </div>
    </Link>
  )
}
