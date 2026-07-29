'use client'

import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import TableComponent from "@/src/shared/components/table/Table";
import { GroupCompleteInfo } from "../types/types";
import { getColorBySubject } from "../../tasks/helpers/getColorCardClass";

type Props = {
  horariosStudent: GroupCompleteInfo[]
}

type ScheduleRow = {
  time: string;
  lunes?: GroupCompleteInfo;
  martes?: GroupCompleteInfo;
  miercoles?: GroupCompleteInfo;
  jueves?: GroupCompleteInfo;
  viernes?: GroupCompleteInfo;
};

export default function TableHorarioClases({ horariosStudent }: Props) {

  const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  const tableData = useMemo(() => {
    const timeSlots = [...new Set(horariosStudent.map((item) => item.startTime))].sort();

    return timeSlots.map((time) => {
      const row: ScheduleRow = { time };

      days.forEach((day) => {
        const classInfo = horariosStudent.find(
          (c) => c.startTime === time && c.dayOfWeek === day
        );
        if (classInfo) {
          row[day] = classInfo;
        }
      });

      return row;
    });
  }, [horariosStudent]);

  const columns: ColumnDef<ScheduleRow>[] = [
    {
      accessorKey: 'time',
      header: 'Hora',
      cell: ({ getValue }) => <span className="font-medium text-gray-500">{String(getValue()).substring(0, 5)}</span>
    },
    ...days.map(day => ({
      accessorKey: day,
      header: day.charAt(0).toUpperCase() + day.slice(1),
      cell: ({ getValue }: any) => {
        const info = getValue();
        if (!info) return <div className="h-12 w-full bg-gray-50/30 rounded-md" />;

        return (
          <div className={`p-2 rounded-lg text-left border-l-4 shadow-sm ${getColorBySubject(info.subjectName)}`}>
            <p className="font-bold text-[11px] truncate">{info.subjectName}</p>
            <p className="text-[10px] opacity-80 truncate">
              {info.teacherFirst.split(' ')[0]} {info.teacherLast.charAt(0)}.
            </p>
          </div>
        );
      }
    }))
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horario de Clases</CardTitle>
        <CardDescription>Horario de clases semanales. Organizate en tus clases</CardDescription>
      </CardHeader>
      <TableComponent data={tableData} columns={columns} nameTable="horario" />
    </Card>
  )
}

