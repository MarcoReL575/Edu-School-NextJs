import { IconChecklist, IconClipboardList, IconClockHour3, IconUserCheck } from "@tabler/icons-react"
import { Tabs, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs"
import CardTabContent from "./CardTabContent"
import { examService } from "../../examenes/services/examService"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { taskService } from "../../tasks/services/taskService"
import { attendanceService } from "../../attendance/services/attendanceService"

type Props = {
    subjectName: string;
    studentId: string;
    groupId: string;
    claseId: string;
}

export default async function TabsInfoSubject({ subjectName, studentId, groupId, claseId }: Props) {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['examsandResults', studentId],
        queryFn: ()=> examService.getExamAndResult(studentId, subjectName)
    });

    await queryClient.prefetchQuery({
        queryKey: ['tasks-student', studentId],
        queryFn: ()=> taskService.getAllTasks(groupId, studentId)
    });

    await queryClient.prefetchQuery({
        queryKey: ['attendace-student', studentId],
        queryFn: ()=> attendanceService.getAttendanceStudentInClass(studentId, claseId)
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <section className="max-w-4xl w-full mx-auto">
            <Tabs defaultValue="overview" className="w-100 flex flex-col">
                <TabsList variant='line'>
                    <TabsTrigger value="tasks"><IconClipboardList/> Tareas</TabsTrigger>
                    <TabsTrigger value="exams"><IconChecklist /> Exámenes</TabsTrigger>
                    <TabsTrigger value="horarios"><IconClockHour3 /> Horarios</TabsTrigger>
                    <TabsTrigger value="attendance"><IconUserCheck /> Asistencias</TabsTrigger>
                </TabsList>

                <CardTabContent title="Tareas" icon={<IconClipboardList/>} description="Información de tus tareas" tabValue="tasks"  studentId={studentId} subjectName={subjectName} groupId={groupId} claseId={claseId}/>
                <CardTabContent title="Horarios" icon={<IconClockHour3 />} description="Horarios de clases" tabValue="horarios" studentId={studentId} subjectName={subjectName} groupId={groupId} claseId={claseId} />
                <CardTabContent title="Exámenes" icon={<IconChecklist />} description="Información de tus Exámenes" tabValue="exams" studentId={studentId} subjectName={subjectName} groupId={groupId} claseId={claseId} />
                <CardTabContent title="Asistencias" icon={<IconUserCheck />} description="Consulta tus asistencias" tabValue="attendance" studentId={studentId} subjectName={subjectName}  groupId={groupId} claseId={claseId} />
            </Tabs>
        </section>
    </HydrationBoundary>
  )
}