'use client'
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { IconArrowsUpDown } from "@tabler/icons-react"
import { AttendanceStatus, StudentAttendance } from "../../clases/types/types"
import { Button } from "@/src/shared/components/ui/button"
import TableComponent from "@/src/shared/components/table/Table"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import clsx from "clsx"
import { takeAttendanceAction } from "../actions/attendanceActions"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

type Props = {
    students: StudentAttendance[];
    claseId: string; 
}

export default function TableAttendance({ students, claseId }: Props) {
    const [attendance, setAttendance] = useState<Record<string, boolean>>(() => {
        const initial: Record<string, boolean> = {};
        students.forEach((student) => initial[student.id] = true);
        return initial;
    });

    const toggleAttendance = (studentId: string) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    const columns = useMemo<ColumnDef<StudentAttendance>[]>(() => 
        [
            {
                accessorKey: 'id',
                header: 'Asistencia',
                cell: (info) => {
                    const studentId: string = info.getValue();
                    return (
                        <input 
                            type="checkbox" 
                            checked={attendance[studentId] ?? true} 
                            onChange={() => toggleAttendance(studentId)} 
                            className="w-5 h-5 cursor-pointer accent-green-600"
                        />
                    ) 
                }
            },
            {
                id: 'fullName',
                accessorFn: (row) => `${row.lastName} ${row.name}`,
                header: ({ column }) => (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Nombre Completo <IconArrowsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'matricula',
                header: () => 'Nombre Completo',
                cell: ({ row }) => <div className="font-medium">{row.getValue("matricula")}</div>
            },
            {
                accessorKey: 'attendance',
                header: () => 'Estatus',
                cell: ({ row }) => {
                    const studentId: string = row.original.id;
                    const isPresent = attendance[studentId];
                    const status: AttendanceStatus = isPresent ? "asistencia" : "falta";
                    const attendanceDb: AttendanceStatus = row.getValue("attendance");
                    return (
                        <div className={clsx('font-medium rounded-lg border capitalize ',
                            status === "asistencia" && 'border-green-500 bg-green-200 text-green-600',
                            status === "falta" && 'border-red-500 bg-red-200 text-red-600',
                        )}>
                            {status }
                        </div>
                    )
                }
            },
        ], [attendance], 
    );

    const handleTakeAttendance = async()=> {
        const  { success, message } = await takeAttendanceAction(attendance, claseId);
        if(!success) {
            toast.error(message);
        }
        if(success) {
            toast.success(message);
            redirect('/dashboard/attendance');
        }
    }

  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Tabla de Asistencias</CardTitle>
                <CardDescription>En la siguiente tabla podrás pasar la asietncia de tus alumnos</CardDescription>
                <CardAction>
                    <Button className="w-fit" onClick={handleTakeAttendance}>
                        Guardar Asistencias
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <TableComponent
                    columns={columns}
                    data={students}
                    nameTable="Tabla de Asistencias"
                />
            </CardContent>
        </Card>
    </>
  )
}