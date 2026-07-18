'use client'

import React, { useMemo } from 'react'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { Card, CardHeader, CardTitle, CardDescription } from '@/src/shared/components/ui/card'
import { Button } from '@/src/shared/components/ui/button'
import TableComponent from '@/src/shared/components/table/Table'
import { TaskDetails } from '../../tasks/types/types'
import { getCorrectDate } from '../../tasks/helpers/getCorrectDate'
import clsx from 'clsx'

type Props = {
  data: TaskDetails[] | undefined;
}

export default function TableTasks({ data }: Props) {

  if (data === undefined) return <div>No se encontraron datos</div>

  const columns = useMemo<ColumnDef<TaskDetails>[]>(() => [
    {
      accessorKey: 'taskTitle',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span>Título de Tarea</span>
          <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("taskTitle")}</div>
    },
    {
      accessorKey: 'taskStatus',
      header: () => <span>Estatus</span>,
      cell: ({ row }) => {
        const status: string = row.getValue("taskStatus")?? 'no-entregada'
        return (
          <div className={clsx("font-sm flex gap-x-2 items-center justify-center capitalize border rounded-lg", 
            status === 'entregada' && 'border-yellow-600 text-yellow-500 bg-yellow-50',
            status === 'calificada' && 'border-green-600 text-green-500 bg-green-50',
            status === 'no-entregada' && 'border-red-600 text-red-500 bg-red-50')
          }>{status}</div>
        )
      }
    },
    {
      accessorKey: 'taskGrade',
      header: () => <span>Calificación</span>,
      cell: ({ row }) => {
        const gradedTask: string = row.getValue("taskGrade")?? '--'
        return (
          <div className={clsx("font-sm flex gap-x-2 items-center justify-center capitalize border rounded-lg", 
            gradedTask === 'entregada' && 'border-yellow-600 text-yellow-500 bg-yellow-50',
            gradedTask === 'calificada' && 'border-green-600 text-green-500 bg-green-50')
          }>{gradedTask}</div>
        )
      }
    },
    {
      accessorKey: 'taskCreatedAt',
      header: () => <span>Fecha De Creación</span>,
      cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{getCorrectDate(row.getValue("taskCreatedAt"))}</div>
    },
    {
      accessorKey: 'taskFechaEntrega',
      header: () => <span>Fecha De Enrega</span>,
      cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{getCorrectDate(row.getValue("taskFechaEntrega"))}</div>
    },
  ], [],);

  return (
    <section className='p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tareas</CardTitle>
          <CardDescription>Revisa la calificación que has obtenido en tus tareas</CardDescription>
        </CardHeader>
        <TableComponent data={data} columns={columns} nameTable='Resultados de Exámenes' />
      </Card>
    </section>
  )
}
