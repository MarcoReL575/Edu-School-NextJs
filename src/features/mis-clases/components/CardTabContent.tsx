'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { TabsContent } from "@/src/shared/components/ui/tabs"
import { ReactElement } from "react";
import TableExamsAndResult from "./TableExamsAndResult";
import TableTasks from "./TableTasks";
import TableAttendances from "./TableAttendances";
import HorariosTable from "./HorariosTable";
import { ExamWithResult } from "../../examenes/types/types";
import { TaskDetails } from "../../tasks/types/types";
import { AttendanceSelect } from "../../attendance/types/types";
import { HorariosSelectType } from "../../clases/types/types";

type Props = {
    title: string;
    icon: ReactElement;
    description: string;
    tabValue: 'tasks' | 'horarios' | 'exams' | 'attendance' | 'studentsList' | 'tasksStudents' | '';
    studentId?: string;
    subjectName?: string;
    groupId?: string;
    claseId?: string
    data: [] | null;
}

export default function CardTabContent({ data, title, icon, description, tabValue, studentId, subjectName, groupId, claseId }: Props) {
  return (
    <TabsContent value={tabValue}>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                    <span>{ icon }</span>
                    <span>{ title }</span>
                </CardTitle>
                <CardDescription>
                    { description }
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                You have 12 active projects and 3 pending tasks.
            </CardContent>
            
            { tabValue === 'exams' && <TableExamsAndResult data={data as ExamWithResult[] } /> }
            { tabValue === 'tasks' && <TableTasks data={data as TaskDetails[]} /> }
            { tabValue === 'attendance' && <TableAttendances data={data as AttendanceSelect[] } /> }
            { tabValue === 'horarios' && <HorariosTable horarios={data as HorariosSelectType[] } /> }
            {/* { tabValue === 'studentsList' && <StudentsInGroup data={data as ExamWithResult[] } /> } */}
        </Card>
    </TabsContent>
  )
}