'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { TabsContent } from "@/src/shared/components/ui/tabs"
import { ReactElement } from "react";
import TableExamsAndResult from "./TableExamsAndResult";
import TableTasks from "./TableTasks";
import TableAttendances from "./TableAttendances";
import HorariosTable from "./HorariosTable";
import { ExamSelectInfo, ExamWithResult } from "../../examenes/types/types";
import { TaskDetails, TaskTeacher } from "../../tasks/types/types";
import { AttendanceSelect } from "../../attendance/types/types";
import { HorariosSelectType } from "../../clases/types/types";
import { StudentsAndScoresInfo } from "../../students/types/types";
import StudentsInGroup from "./StudentsInGroup";
import GridTaskTeacher from "../../tasks/components/GridTaskTeacher";
import CardExamTeacher from "../../examenes/components/CardExamTeacher";

type Props = {
    title: string;
    icon: ReactElement;
    description: string;
    tabValue: 'tasks' | 'horarios' | 'exams' | 'attendance' | 'studentsList' | 'taskClasesList' | 'examsList';
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
            { tabValue === 'studentsList' && <StudentsInGroup data={data as StudentsAndScoresInfo[] } /> }
            { tabValue === 'taskClasesList' && <GridTaskTeacher taskList={data as TaskTeacher[] } /> }
            { tabValue === 'examsList' &&
                <section className='grid grid-cols-2 gap-4'>
                    {data !== null && data.length > 0
                        ?   data.map((exam: ExamSelectInfo)=> (
                                <CardExamTeacher key={exam.id} exam={exam} />
                            )) 
                        :   <div>Aún no hay examenes creados</div>
                    }
                    </section>
            }
        </Card>
    </TabsContent>
  )
}