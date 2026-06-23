'use client'

import Link from "next/link";
import { ExamStudentInfo } from "../types/types"
import { Button } from "@/src/shared/components/ui/button";

type Props = {
    exam: ExamStudentInfo
}

export default function CardExamStudent({ exam }: Props) {

    const hasSubmitted = exam.studentSubmissionStatus === 'entregado';
    const isAvailable = exam.status === 'activo' && !hasSubmitted;

    return (
        <div
            key={exam.id}
            className={`bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all ${isAvailable ? 'border-2 border-black' : 'border-gray-200'
                }`}
        >
            <div>
                {/* Header de la Card */}
                <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                        {exam.grade}{exam.groupName} {exam.level}
                    </span>

                    {/* Badge dinámico por Alumno */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${hasSubmitted
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : exam.status === 'concluido'
                            ? 'bg-gray-100 text-gray-500 border-gray-200'
                            : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                        }`}>
                        {hasSubmitted ? 'EVALUADO' : exam.status === 'concluido' ? 'EXPIRADO' : 'PENDIENTE'}
                    </span>
                </div>

                {/* Título e Info del examen */}
                <div className="mt-3">
                    <span className="text-xs font-semibold text-gray-400 block">{exam.subjectName}</span>
                    <h3 className="font-bold text-gray-900 text-base leading-snug mt-0.5">{exam.title}</h3>
                </div>

                {/* Detalles Técnicos */}
                <div className="flex items-center gap-x-4 text-xs font-medium text-gray-500 pt-3">
                    <span className="h-3 w-px bg-gray-200" />
                    <span>{exam.questionsCount} preguntas</span>
                </div>
            </div>

            {/* Botón de acción o Calificación al pie de la Card */}
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                {hasSubmitted ? (
                    <>
                        <span className="text-[11px] text-gray-400 font-semibold uppercase">Tu Resultado</span>
                        <span className="text-sm font-black text-green-700 bg-green-50 px-2.5 py-1 rounded-lg border border-green-200">
                            {Number(exam.studentScore).toFixed(0)} / 100
                        </span>
                    </>
                ) : exam.status === 'concluido' ? (
                    <p className="text-xs font-medium text-gray-400 italic">No se presentaron respuestas.</p>
                ) : (
                    <Link href={`/dashboard/examenes/${exam.slug}`} >
                        <Button>Iniciar Evaluación</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}
