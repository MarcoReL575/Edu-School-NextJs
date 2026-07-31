'use client'

import { IconArrowsUpDown, IconCirclePlus } from '@tabler/icons-react'
import clsx from 'clsx'
import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '@/src/shared/components/ui/card'
import { ExamWithResult } from '../../examenes/types/types'
import { Button } from '@/src/shared/components/ui/button'
import TableComponent from '@/src/shared/components/table/Table'
import { getCorrectDate } from '../../tasks/helpers/getCorrectDate'
import { StudentsAndScoresInfo } from '../../clases/types/types'
import { unknown } from 'zod'

type Props = {
    data: StudentsAndScoresInfo[] | undefined;
}

export default function StudentsInGroup({ data }: Props) {

    if(data === undefined) return <div>No se encontraron datos</div>

    const columns = useMemo<ColumnDef<StudentsAndScoresInfo>[]>(() => [
        {
            accessorKey: 'last_name',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Appelido</span>
                    <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                return (
                    <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue('last_name')}</div>
                )
            }
        },
        {
            accessorKey: 'name',
            header: () => <span>Nombre</span>,
            cell: ({ row }) => {
                return (
                    <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue('name')}</div>
                )
            }
        },
        {
            accessorKey: 'scoreFinal',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Promedio</span>
                    <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const score: number = row.getValue("scoreFinal")
                const finalScore = score !== null ? score : '--';
                return (
                    <div className="font-sm flex gap-x-2 items-center justify-center">{finalScore}</div>
                )
            }
        },
    ], [], );

  return (
    <section className='p-4'>
        <Card>
            <CardHeader>
                <CardTitle>Lista de Estudiantes</CardTitle>
                <CardDescription>Revisa los alumnos que están inscirots en tu clase</CardDescription>
            </CardHeader>
            <TableComponent data={data} columns={columns} nameTable='Alumnos Inscritos' />
        </Card>
    </section>
    )
}
