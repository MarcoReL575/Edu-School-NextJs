import Heading from "@/src/shared/components/typography/Heading";
import { ClassesByGroup } from "../types/types"
import CardsTareas from "./CardsTareas";
import { IconChartBarPopular, IconClockHour3 } from "@tabler/icons-react";
import { getColorBySubject } from "./TableHorarioClases";
import { clases } from "@/src/db/schema";

type Props = {
    clase: ClassesByGroup;
}

export default function CardClases({ clase }: Props) {
    const { subjectName, teachersLastname, teachersName } = clase;
    const totalAttendance = clase.attendances.length
    const attendance = clase.attendances.filter((attendance)=> attendance.status === 'asistencia');
    const attendancePercentage = (attendance.length * 100) / (totalAttendance)
    const attendanceStat = +attendancePercentage.toFixed(2)

  return (
    <div className={`border rounded-xl flex flex-col space-y-3 bg-gray-50 shadow-lg p-2 hover:scale-110 transition-all duration-300 ease-in cursor-pointer ${getColorBySubject(subjectName!)}`}>
        <Heading level={3} className=" text-center">{subjectName}</Heading>
        <p className="text-center">Profesor(a): {teachersName} {teachersLastname}</p>
        <div className="flex items-center justify-between text-gray-500">
            <p className="flex items-center gap-x-1"> 
                <IconChartBarPopular size={20} />
                <span className="">Promedio: </span>
                <span>8.5</span>
            </p>
            <p className="flex items-center gap-x-1"> 
                <IconClockHour3 size={20} />
                <span className="">Asistencias:</span>
                <span>{totalAttendance > 0 ? attendanceStat : '--' }%</span>
            </p>
        </div>
    </div>
  )
}
