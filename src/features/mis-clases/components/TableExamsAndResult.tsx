'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '@/src/shared/components/ui/card'
import { IconArrowsUpDown, IconCirclePlus } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { ExamWithResult } from '../../examenes/types/types'
import { Button } from '@/src/shared/components/ui/button'
import TableComponent from '@/src/shared/components/table/Table'
import { getCorrectDate } from '../../tasks/helpers/getCorrectDate'
import clsx from 'clsx'

type Props = {
    data: ExamWithResult[] | undefined;
}

export default function TableExamsAndResult({ data }: Props) {

    if(data === undefined) return <div>No se encontraron datos</div>

    const columns = useMemo<ColumnDef<ExamWithResult>[]>(() => [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Nombre Examen</span>
                    <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("title")}</div>
        },
        {
            accessorKey: 'score',
            header: () => <span>Calificación</span>,
            cell: ({ row }) => {
                const examScore: number = row.getValue("score")?? '--'
                return (
                    <div className="font-sm flex gap-x-2 items-center justify-center">{examScore}</div>
                )
            }
        },
        {
            accessorKey: 'statusSubmission',
            header: () => <span>Estatus</span>,
            cell: ({ row }) => {
                const statusExam: string = row.getValue("statusSubmission")?? 'no entergado';
                return (
                    <div className={clsx("font-sm flex gap-x-2 items-center justify-center capitalize rounded-lg border",
                        statusExam === 'entregado' ? 'border-green-600 text-green-500 bg-green-50' : 'border-red-600 text-red-500 bg-red-50'
                    )}>{statusExam}</div>
                )
            }
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Fecha Del Exámen</span>,
            cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{getCorrectDate(row.getValue("createdAt"))}</div>
        },
    ], [], );

  return (
    <section className='p-4'>
        <Card>
            <CardHeader>
                <CardTitle>Lista de Exámenes</CardTitle>
                <CardDescription>Revisa la calificación que has obtenido en tus exámenes</CardDescription>
            </CardHeader>
            <TableComponent data={data} columns={columns} nameTable='Resultados de Exámenes' />
        </Card>
    </section>
    )
}
