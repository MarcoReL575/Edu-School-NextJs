'use client'

import Link from "next/link"
import { TeachersClases } from "../types/types"
import { Route } from "next"
import { usePathname } from "next/navigation"
import { Button } from "@/src/shared/components/ui/button"
import { number } from "zod"

type Props = {
  clase: TeachersClases
}

export default function CardClasesTeacher({ clase }: Props) {

  const path = usePathname();
  const attendancePage = path.includes('attendance');
  const averageScore = clase.averageScore !== null && clase.averageScore !== undefined ? Number(clase.averageScore).toFixed(2) : '--';

  return (
    <div className="rounded-lg bg-gray-50 border-2 border-gray-200 space-y-4 p-4 w-full">
      <p>{clase.subjectName}</p>
      <p>{clase.grade} {clase.group} {clase.level}</p>
      <div className="text-sm text-gray-500 flex items-center justify-between">
        <span>Promedio: {averageScore}</span>
        <span>Alumnos: {clase.totalStudents}</span>
      </div>
      <Button>
        <Link
          href={attendancePage? `attendance/${clase.slug}` as Route : `/dashboard/mis-clases/${clase.slug}` as Route}
        >
          {
            attendancePage ? 'Tomar Asistencia' : 'Ver más información'
          }
        </Link>
      </Button>
    </div>
  )
}
