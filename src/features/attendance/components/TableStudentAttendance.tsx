'use client'

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { ArrowUpDown, Calendar, Clock } from "lucide-react";
import { getAttendancesByStudentAction } from "../actions/attendanceActions";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import TableComponent from "@/src/shared/components/table/Table";
import { AttendanceStudentTable } from "../types/types";
import { Button } from "@/src/shared/components/ui/button";
import { formatTime } from "../../tasks/helpers/formatTime";
import clsx from "clsx";

type Props = {
  studentId: string;
}

export default function TableStudentAttendance({ studentId }: Props) {

  const { data: attendanceStudent, isLoading, isError } = useQuery({
    queryKey: ['attendance-student', studentId],
    queryFn: ()=> getAttendancesByStudentAction(studentId),
  });

  const columns = useMemo<ColumnDef<AttendanceStudentTable>[]>(() => [
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium flex items-center justify-center gap-x-2"> <Calendar />{row.getValue("date")}</div>
    },
    {
      accessorKey: 'subjectName',
      header: () => <span>Materia</span>,
      cell: ({ row }) => <div className="font-medium ">{row.getValue("subjectName")}</div>,
    },
    {
      accessorKey: 'hour',
      header: () => <span>Hora de registro</span>,
      cell: ({ row }) => <div className="font-medium flex items-center justify-center gap-x-2"><Clock /> <span>{formatTime(row.getValue("hour"))}</span></div>,
    },
    {
      accessorKey: 'status',
      header: () => <span>Acciones</span>,
      cell: ({ row }) => {
        const status: string = row.getValue("status")
        return (
          <div className={clsx('font-medium capitalize border rounded-lg', { 
            'bg-green-200 border-green-700 text-green-700' : status === 'asistencia',
            'bg-red-200 border-red-700 text-red-700' : status === 'falta',
            })}
          >
            {status}
          </div>
        )
      },
    },
  ], [], );

  if(isError || !attendanceStudent?.attendances) return <div>Error al cargar las asistencias</div>;
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mis asistencias</CardTitle>
          <CardDescription>Lleva un control de tus asistencias</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <TableComponent columns={columns} data={attendanceStudent.attendances} nameTable="Attendance-Table" />
        </CardContent>
        <CardFooter>
          {/* <TablePagination table={} /> */}
        </CardFooter>
      </Card>
    </>
  )
}
