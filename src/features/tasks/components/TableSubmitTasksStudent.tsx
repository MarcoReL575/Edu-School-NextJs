'use client'

import Link from "next/link";
import { Route } from "next";
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { IconArrowsUpDown, IconCheck, IconChecklist, IconClipboardCheck, IconClipboardData, IconClipboardOff, IconFileText, IconHistoryToggle, IconPercentage40 } from "@tabler/icons-react";
import { getActualGradeTaskAction, taskStudentAction } from "../actions/tasksAction"
import TableComponent from "@/src/shared/components/table/Table";
import { Button } from "@/src/shared/components/ui/button";
import { getCorrectDate } from "../helpers/getCorrectDate";
import { Card, CardDescription, CardHeader } from "@/src/shared/components/ui/card";
import Heading from "@/src/shared/components/typography/Heading";
import { GradeTasks, SubmitTasksStudents } from "../types/types";
import CardStatsSubmittedTasks from "./CardStatsSubmittedTasks";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { useTasksStore } from "../store/useTasksStore";

type Props = {
  groupId: string;
  taskId: number;
}

export default function TableSubmitTasksStudent({ groupId, taskId }: Props) {
  const openModal = useModalStore((state)=> state.openModal);
  const taskEdit = useTasksStore((state)=> state.taskEdit);
  const setTaskEdit = useTasksStore((state)=> state.setTaskEdit);
  const setTaskGraded = useTasksStore((state)=> state.setTaskGraded);
  const setTaskSubmissionId = useTasksStore((state)=> state.setTaskSubmissionId);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ListTasksGrade', taskId],
    queryFn: () => taskStudentAction(groupId, taskId),
  });

  const handleGradeTask = (taskSubmissionId: string) => {
    setTaskEdit(false);
    setTaskGraded({} as GradeTasks);
    setTaskSubmissionId(taskSubmissionId);
    openModal('modalGradeTask');
  }

  const handleEditTask = async(taskSubmissionId: string) => {
    const{ success, message, data } = await getActualGradeTaskAction(taskSubmissionId);
    if(!success) {
      toast.error(message);
      return
    }
    if(success && data) {
      setTaskGraded(data);
      setTaskEdit(true);
      setTaskSubmissionId(taskSubmissionId);
      openModal('modalGradeTask');
    }
  }

  const stats = useMemo(() => { 
    const studentsList = data?.data || [];
    const totalStudents = studentsList.length;
    if(totalStudents === 0) return { entregadas: 0, pendientes: 0, calificadas: 0, promedio: "0.0", porcentajeEntregas: 0 };

    let entregadas = 0;   
    let calificadas = 0;
    let totalCalificacion = 0;

    studentsList.forEach((student) => {
      if(student.submissionId) entregadas++;
      if(student.calificacion) {
        const nota = Number(student.calificacion);
        if(!isNaN(nota)) {
          calificadas++;
          totalCalificacion += nota;
        }
      }
    });
    const promedio = calificadas > 0 ? (+totalCalificacion / calificadas).toFixed(1) : "0";
    const porcentajeEntregas = totalStudents > 0 ? Math.round((entregadas / totalStudents) * 100) : 0;

    return {
      entregadas,
      pendientes: totalStudents - entregadas,
      calificadas,
      promedio,
      porcentajeEntregas
    };

  }, [data]); 

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
      cell: ({ row }) => <span className="font-medium">{getCorrectDate(row.getValue("submittedAt")) ?? '-'}</span>,
    },
    {
      accessorKey: 'attachments',
      header: () => <span>Archivos Adjuntos</span>,
      cell: ({ row }) => {
        const attachments = row.original.attachments || [];
        if (attachments.length === 0) return <span className="font-medium">-</span>;

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
      cell: ({ row }) => (
        <div className="font-medium capitalize flex justify-start items-center">
          {row.getValue("submissionStatus") === "entregada" 
            ? <span className="flex items-center gap-x-1"><IconHistoryToggle />{row.getValue('submissionStatus')}</span>
            : row.getValue("submissionStatus") === "calificada" 
              ? <span className="flex items-center gap-x-1"><IconCheck />{row.getValue("submissionStatus")}</span>
              : <span className="text-gray-500 flex items-center gap-x-1">{row.getValue("submissionStatus")}</span>
          }
        </div>
      )
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
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-x-2">
          {row.getValue('submissionStatus') === null && '-'}
          {row.getValue('submissionStatus') === 'entregada' && <Button variant="outline" size="sm" onClick={() => handleGradeTask(row.getValue("submissionId"))}>Calificar</Button> }
          {row.getValue('submissionStatus') === 'calificada' && <Button variant="outline" size="sm" onClick={() => handleEditTask(row.getValue("submissionId"))}>Editar</Button>}
        </div>
      )
    }
  ], [],);

  return (
    <>
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CardStatsSubmittedTasks title="entregadas" description="Con entrega" icon={<IconClipboardCheck size={30} />} value={stats.entregadas} />
        <CardStatsSubmittedTasks title="pendientes" description="Sin entregar" icon={<IconClipboardOff size={30} />} value={stats.pendientes} />
        <CardStatsSubmittedTasks title="porcentaje" description="Porcentaje de Entrega" icon={<IconPercentage40 size={30} />} value={stats.porcentajeEntregas} />
        <CardStatsSubmittedTasks title="promedio" description="Promedio de calificaciones" icon={<IconClipboardData size={30} />} value={Number(stats.promedio)} />
        <CardStatsSubmittedTasks title="calificadas" description="Tareas calificadas" icon={<IconChecklist size={30} />} value={stats.calificadas} />
      </section>
      <Card>
        <CardHeader>
          <Heading level={3}>Entrega De Tareas</Heading>
          <CardDescription className="text-gray-400">Ve la información completa de la entrega de traeas de tus alumnos. Califica las tareas y agrega comentarios en caso de que se requieran.</CardDescription>
        </CardHeader>
        <TableComponent columns={columns} data={data?.data || []} nameTable="tareas de Estudiantes" />
      </Card>
    </>
  )
}