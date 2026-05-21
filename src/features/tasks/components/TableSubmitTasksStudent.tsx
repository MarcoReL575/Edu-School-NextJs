'use client'

import { useQuery } from "@tanstack/react-query"
import { taskStudentAction } from "../actions/tasksAction"
import TableComponent from "@/src/shared/components/table/Table";
import { SubmitTasksStudents } from "../types/types";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/src/shared/components/ui/button";
import { IconArrowsUpDown, IconFileText } from "@tabler/icons-react";
import { getCorrectDate } from "../helpers/getCorrectDate";
import Link from "next/link";
import { Route } from "next";

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
      cell: ({ row }) => <span className="font-medium">{getCorrectDate(row.getValue("submittedAt"))?? '-'}</span>,
    },
    {
      accessorKey: 'attachments',
      header: () => <span>Archivos Adjuntos</span>,
      cell: ({ row }) => {
        const attachments = row.original.attachments || [];
        if(attachments.length === 0) return <span className="font-medium">-</span>;

        return (
          <div className="flex flex-col gap-2">
            {attachments.map((file) => (
              <Link key={file.id} href={file.fileUrl as Route} target="_blank" rel="noopener noreferrer" className="text-blue-500 justify-center hover:underline flex items-center gap-x-2 text-sm">
                <IconFileText className="h-3.5 w-3.5 text-gray-600 shrink-0" />{file.fileName}
              </Link>
            ))}
          </div>
        );
      }
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
              Calificar
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
