'use client'

import React, { useMemo } from 'react'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { Card, CardHeader, CardTitle, CardDescription } from '@/src/shared/components/ui/card'
import { Button } from '@/src/shared/components/ui/button'
import TableComponent from '@/src/shared/components/table/Table'
import { TaskDetails } from '../../tasks/types/types'
import { getCorrectDate } from '../../tasks/helpers/getCorrectDate'

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
      cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("taskStatus")}</div>
    },
    {
      accessorKey: 'taskGrade',
      header: () => <span>Calificación</span>,
      cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("taskGrade")}</div>
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
  console.log(data)

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
