'use client'

import { useQuery } from "@tanstack/react-query"
import { taskStudentAction } from "../actions/tasksAction"
import TableComponent from "@/src/shared/components/table/Table";
import { SubmitTasksStudents } from "../types/types";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/src/shared/components/ui/button";
import { IconArrowsUpDown } from "@tabler/icons-react";
import { getCorrectDate } from "../helpers/getCorrectDate";

type Props = {
  groupId: string;
  taskId: number;
}

export default function TableSubmitTasksStudent({ groupId, taskId }: Props) {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskStudentAction(groupId, taskId),
  });

  const columns = useMemo<ColumnDef<SubmitTasksStudents>[]>(() => [
    {
      accessorKey: 'studentName',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("studentName")}</div>
    },
    {
      accessorKey: 'studentLastname',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Apellido <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("studentLastname")}</div>,
    },
    {
      accessorKey: 'submittedAt',
      header: () => <span>Fecha de Entrega</span>,
      cell: ({ row }) => <div className="font-medium">{getCorrectDate(row.getValue("submittedAt"))?? '-'}</div>,
    },
    {
      accessorKey: 'submissionStatus',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status<IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium capitalize">{row.getValue("submissionStatus")?? "Pendiente"}</div>,
    },
    {
      accessorKey: 'calificacion',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Calificación <IconArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("calificacion") ?? '-'}</div>,
    },
    {
      accessorKey: 'feedback',
      header: () => <Button variant="ghost">Comentarios</Button>,
      cell: ({ row }) => <div className="font-medium">{row.getValue("feedback") ?? '-'}</div>,
    },
    {
      accessorKey: 'submissionId',
      header: () => <span>Acciones</span>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-x-2">
            <Button variant="outline" size="sm">
              Ver
            </Button>
            <Button variant="outline" size="sm">
              Editar
            </Button>
          </div>
        );
      }
    }
  ], [],);

  return (
    <TableComponent columns={columns} data={data?.data || []} nameTable="tareas de Estudiantes" />
  )
}
