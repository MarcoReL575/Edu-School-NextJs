'use client'

import { ColumnDef } from '@tanstack/react-table';
import { IconCheck, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/shared/components/ui/card';
import TableComponent from '@/src/shared/components/table/Table'
import { StudentRowData, StudentsSubmissions } from '../types/types';

type Props = {
    students: StudentsSubmissions
}

export default function TableExamControlStudents({ students }: Props) {

    const columns: ColumnDef<StudentRowData>[] = [
        {
            id: "student",
            header: "Alumno",
            cell: ({ row }) => {
                const name = row.original.name;
                const lastname = row.original.lastName;
                return <span className="font-medium text-gray-900">{lastname} {name}</span>;
            }
        },
        {
            id: "status",
            header: "Estatus",
            cell: ({ row }) => {
                const submission = row.original.examSubmissions[0];
                const status = submission?.status;

                return (
                    <div className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full gap-x-2 text-xs font-medium border ',
                        status === 'entregado' && 'bg-emerald-50 text-emerald-700 border-emerald-200',
                        status !== 'entregado' && 'bg-red-50 text-red-700 border-red-200'
                    )}>
                        {status === 'entregado' ?  <span><IconCheck size={18} /></span> : <span><IconX size={18} /></span>}
                        {status === 'entregado' ? 'Entregado' : 'Sin Entregar'}
                    </div>
                );
            }
        },
        {
            id: "submittedAt",
            header: "Fecha de Entrega",
            cell: ({ row }) => {
                const date = row.original.examSubmissions[0]?.submittedAt;
                if (!date) return <span className="text-gray-400">—</span>;
                return (
                    <span className="text-gray-500 text-xs">
                        {new Date(date).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                );
            }
        },
        {
            id: "score",
            header: () => <div className="text-right">Calificación</div>,
            cell: ({ row }) => {
                const submission = row.original.examSubmissions[0];

                if (!submission || submission.status !== "entregado") {
                    return (
                        <div className="text-right text-gray-400 font-normal italic text-xs">
                            {submission?.status === 'en_progreso' ? 'Pendiente' : 'Sin Nota'}
                        </div>
                    );
                }

                const scoreNum = submission.score ? parseFloat(submission.score) : 0;
                return (
                    <div className="text-right font-bold">
                        <span className={`text-base ${scoreNum >= 70 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {scoreNum.toFixed(1)} / 100
                        </span>
                    </div>
                );
            }
        }
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Entrega de Exámenes</CardTitle>
                <CardDescription>Tabla para administra la entrega de exámenes de tus alumnos</CardDescription>
            </CardHeader>
            <CardContent>
                <TableComponent columns={columns} data={students} nameTable="Tabla de Entrega de Exámenes" />
            </CardContent>
        </Card>
    )
}