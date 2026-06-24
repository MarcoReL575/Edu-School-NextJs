'use client'

import { useState } from "react";
import { StudentExamRender } from "../types/types"
import { IconChevronLeft, IconChevronRight, IconCircleCheck, IconClock, IconSend } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/src/shared/components/ui/button";
import { submitExamAction } from "../actions/examAction";
import toast from "react-hot-toast";

type Props = {
    examDetails: StudentExamRender;
    slug: string
}

export default function TakeExam({ examDetails, slug }: Props) {

    const [exam] = useState<StudentExamRender>(examDetails)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Estado para almacenar las respuestas seleccionadas: { [questionId]: optionId }
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const [isFinished, setIsFinished] = useState(false);
    const currentQuestion = exam.questions[currentQuestionIndex];

    const handleSelectOption = (questionId: string, optionId: string) => {
        setAnswers({
            ...answers,
            [questionId]: optionId
        })
    }

    // Calcular porcentaje de avance
    const progressPercentage = Math.round((Object.keys(answers).length / exam.questions.length) * 100);

    const handleSubmitExam = async() => {
        const totalQuestions = exam.questions.length
        const answeredCount = Object.keys(answers).length

        if (answeredCount < totalQuestions) {
            const confirmSubmit = window.confirm(
                `Has respondido ${answeredCount} de ${totalQuestions} preguntas. ¿Estás seguro de que deseas finalizar el examen?`
            )
            if (!confirmSubmit) return
        }

        const examData = {
            examId: examDetails.id,
            examSlug: slug,
            answers
        }

        setIsFinished(true)
        const { success, message } = await submitExamAction(examData)
        if(!success) {
            toast.error(message)
        }
        if(success) {
            toast.success(message)
        }
    }

    if (isFinished) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
                <div className="h-14 w-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center text-green-600 shadow-sm animate-bounce">
                    <IconCircleCheck className="h-8 w-8" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Examen Entregado</h1>
                <p className="text-sm text-gray-500">
                    Tus respuestas para <strong>{exam.title}</strong> han sido registradas en el sistema correctamente. El maestro te notificará cuando las calificaciones estén publicadas.
                </p>
                <Link href={'/dashboard/examenes'}>
                    <Button >
                        Regresar a Exámenes
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <>
            {/* ⏳ BARRA SUPERIOR FLOTANTE (Información y Timer) */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between sticky top-4 z-40">
                <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{exam.subjectName}</span>
                    <h1 className="text-base font-bold text-gray-900 truncate max-w-70 sm:max-w-none leading-tight">{exam.title}</h1>
                </div>
            </div>

            {/* 📋 INDICADOR DE PROGRESO */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-gray-400">
                    <span>Progreso de respuestas</span>
                    <span>{Object.keys(answers).length} de {exam.questions.length} respondidas</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-black transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* ❓ CONTENEDOR DE LA PREGUNTA ACTUAL */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
                        Pregunta {currentQuestionIndex + 1} de {exam.questions.length}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                        Valor: {currentQuestion.points} pts
                    </span>
                </div>

                <p className="text-gray-900 font-semibold text-base leading-relaxed">
                    {currentQuestion.questionText}
                </p>

                {/* Listado de Opciones de Respuesta */}
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {currentQuestion.options.map((option) => {
                        const isSelected = answers[currentQuestion.id] === option.id

                        return (
                            <button
                                key={option.id}
                                onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                                className={`w-full text-left p-3.5 border rounded-xl text-sm font-medium transition-all flex items-center justify-between ${isSelected
                                        ? 'border-2 border-black bg-gray-50/50 font-semibold'
                                        : 'border-gray-200 hover:bg-gray-50/60 text-gray-700'
                                    }`}
                            >
                                <span>{option.text}</span>
                                <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-4 border-black' : 'border-gray-300'
                                    }`} />
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* 🧭 BOTONES DE NAVEGACIÓN */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="inline-flex items-center gap-x-1.5 px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition disabled:opacity-40 disabled:hover:bg-white"
                >
                    <IconChevronLeft className="h-4 w-4" /> Anterior
                </button>

                {currentQuestionIndex < exam.questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                        className="inline-flex items-center gap-x-1.5 px-4 py-2 border border-gray-900 bg-black text-white rounded-lg text-xs font-bold hover:bg-gray-800 transition"
                    >
                        Siguiente <IconChevronRight className="h-4 w-4" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmitExam}
                        className="inline-flex items-center gap-x-1.5 px-5 py-2 bg-green-700 text-white border border-green-800 rounded-lg text-xs font-bold hover:bg-green-600 transition shadow-sm"
                    >
                        <IconSend className="h-4 w-4" /> Finalizar y Entregar Examen
                    </button>
                )}
            </div>
        </>
    )
}