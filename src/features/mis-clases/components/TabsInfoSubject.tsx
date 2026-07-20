import { IconChecklist, IconClipboardList, IconClockHour3, IconUserCheck } from "@tabler/icons-react"
import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import CardTabContent from "./CardTabContent"
import { examService } from "../../examenes/services/examService"
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query"
import { taskService } from "../../tasks/services/taskService"
import { attendanceService } from "../../attendance/services/attendanceService"
import { getAttendanceAction, getExamsAndResultActions, getHorariosAction, getTasksAction } from "../actions/taskActions"

type Props = {
    subjectName: string;
    studentId: string;
    groupId: string;
    claseId: string;
}

export default async function TabsInfoSubject({ subjectName, studentId, groupId, claseId }: Props) {

    const queryClient = new QueryClient();
    const { data: exams, } = useQuery({
        queryKey: ['examsandResults', studentId, claseId],
        queryFn: ()=> getExamsAndResultActions(studentId, subjectName),
    });

    const { data: tasks} = useQuery({
        queryKey: ['tasks-student-subject', studentId, claseId],
        queryFn: ()=> getTasksAction(studentId, claseId),
    });

    const { data: attendances } = useQuery({
        queryKey: ['attendace-student', studentId, claseId],
        queryFn: ()=> getAttendanceAction(studentId, subjectName),
    });

    const { data: horarios } = useQuery({
        queryKey: ['horarios-student', studentId, claseId],
        queryFn: ()=> getHorariosAction(claseId),
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <section className="">
            <Tabs defaultValue="tasks" className=" flex flex-col p-4">
                <TabsList variant='line' className="mx-auto border rounded-lg border-gray-600 bg-gray-100 p-2">
                    <TabsTrigger value="tasks"><IconClipboardList/> Tareas</TabsTrigger>
                    <TabsTrigger value="exams"><IconChecklist /> Exámenes</TabsTrigger>
                    <TabsTrigger value="horarios"><IconClockHour3 /> Horarios</TabsTrigger>
                    <TabsTrigger value="attendance"><IconUserCheck /> Asistencias</TabsTrigger>
                </TabsList>

                <CardTabContent data={tasks?.tasks as []} title="Tareas" icon={<IconClipboardList/>} description="Información de tus tareas" tabValue="tasks"  studentId={studentId} subjectName={subjectName} groupId={groupId} claseId={claseId}/>
                <CardTabContent data={horarios?.horarios as []} title="Horarios" icon={<IconClockHour3 />} description="Horarios de clases" tabValue="horarios" studentId={studentId} subjectName={subjectName} groupId={groupId} claseId={claseId} />
                <CardTabContent data={exams?.exams as []} title="Exámenes" icon={<IconChecklist />} description="Información de tus Exámenes" tabValue="exams" studentId={studentId} subjectName={subjectName} groupId={groupId} claseId={claseId} />
                <CardTabContent data={attendances?.attendances as []} title="Asistencias" icon={<IconUserCheck />} description="Consulta tus asistencias" tabValue="attendance" studentId={studentId} subjectName={subjectName}  groupId={groupId} claseId={claseId} />
            </Tabs>
        </section>
    </HydrationBoundary>
  )
}