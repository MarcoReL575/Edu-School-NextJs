'use client'

import React, { useMemo } from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { Clock } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import { Card, CardHeader, CardTitle, CardDescription } from '@/src/shared/components/ui/card'
import { Button } from '@/src/shared/components/ui/button'
import TableComponent from '@/src/shared/components/table/Table'
import { AttendanceSelect, AttendanceStudentTable } from '../../attendance/types/types'
import { formatTime } from '../../tasks/helpers/formatTime'

type Props = {
    data: AttendanceSelect[] | undefined;
}

export default function TableAttendances({ data }: Props) {
    console.log(data)

    if (data === undefined) return <div>No se encontraron datos</div>

    const columns = useMemo<ColumnDef<AttendanceSelect>[]>(() => [
        {
            accessorKey: 'date',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Fecha</span>,
                </Button>
            ),
            cell: ({ row }) => (
                <div className="font-sm flex gap-x-2 items-center justify-center">
                    <IconCalendar />
                    <span>{row.getValue("date")}</span>
                </div>
            )
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Hora de registro</span>,
            cell: ({ row }) => <div className="font-medium flex items-center justify-center gap-x-2"><Clock /> <span>{formatTime(row.getValue("createdAt"))}</span></div>,
        },
        {
            accessorKey: 'status',
            header: () => <span>Calificación</span>,
            cell: ({ row }) => {
                const status = row.getValue('status');
                return (
                    <div className={clsx("font-sm flex gap-x-2 items-center justify-center border rounded-lg capitalize",
                        status === 'asistencia' && 'border-green-600 text-green-500 bg-green-100',
                        status === 'falta' && 'border-red-600 text-red-500 bg-red-100'
                    )}>
                        <span>{row.getValue("status")}</span>
                    </div>
                )
            }
        },
    ], [],);

    return (
        <section className='p-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Asistencias</CardTitle>
                    <CardDescription>Revisa las asistencias de la materia en curso</CardDescription>
                </CardHeader>
                <TableComponent data={data} columns={columns} nameTable='asistencias' />
            </Card>
        </section>
    )
}
