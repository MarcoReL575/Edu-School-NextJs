'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { TabsContent } from "@/src/shared/components/ui/tabs"
import { ReactElement } from "react";
import { getAttendanceAction, getExamsAndResultActions, getHorariosAction, getTasksAction } from "../actions/taskActions";
import TableExamsAndResult from "./TableExamsAndResult";
import TableTasks from "./TableTasks";
import TableAttendances from "./TableAttendances";
import HorariosTable from "./HorariosTable";
import { useQuery } from "@tanstack/react-query";

type Props = {
    title: string;
    icon: ReactElement;
    description: string;
    tabValue: 'tasks' | 'horarios' | 'exams' | 'attendance';
    studentId: string;
    subjectName: string;
    groupId: string;
    claseId: string
}

export default function CardTabContent({ title, icon, description, tabValue, studentId, subjectName, groupId, claseId }: Props) {

    const { data: exams, } = useQuery({
        queryKey: ['examsandResults', studentId, claseId],
        queryFn: ()=> getExamsAndResultActions(studentId, subjectName),
        enabled: tabValue === 'exams'
    });

    const { data: tasks} = useQuery({
        queryKey: ['tasks-student-subject', studentId, claseId],
        queryFn: ()=> getTasksAction(studentId, claseId),
        enabled: tabValue === 'tasks'
    });

    const { data: attendances } = useQuery({
        queryKey: ['attendace-student', studentId, claseId],
        queryFn: ()=> getAttendanceAction(studentId, subjectName),
        enabled: tabValue === 'attendance'
    });

    const { data: horarios } = useQuery({
        queryKey: ['horarios-student', studentId, claseId],
        queryFn: ()=> getHorariosAction(claseId),
        enabled: tabValue === 'attendance'
    });

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
            
            { tabValue === 'exams' && <TableExamsAndResult data={exams?.exams} /> }
            { tabValue === 'tasks' && <TableTasks data={tasks?.tasks} /> }
            { tabValue === 'attendance' && <TableAttendances data={attendances?.attendances} /> }
            { tabValue === 'horarios' && <HorariosTable horarios={horarios?.horarios} /> }
        </Card>
    </TabsContent>
  )
}