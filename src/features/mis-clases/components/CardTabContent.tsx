'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { TabsContent } from "@/src/shared/components/ui/tabs"
import { QueryClient, useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { getAttendanceAction, getExamsAndResultActions, getTasksAction } from "../actions/taskActions";
import { examService } from "../../examenes/services/examService";
import { taskService } from "../../tasks/services/taskService";
import { attendanceService } from "../../attendance/services/attendanceService";
import TableExamsAndResult from "./TableExamsAndResult";
import { ExamWithResult } from "../../examenes/types/types";

type Props = {
    title: string;
    icon: ReactElement;
    description: string;
    tabValue: 'tasks' | 'horarios' | 'exams' | 'attendance';
    studentId: string;
    subjectName: string;
    groupId: string;
}

export default function CardTabContent({ title, icon, description, tabValue, studentId, subjectName, groupId}: Props) {

    const { data: exams, } = useQuery({
        queryKey: ['examsandResults', studentId],
        queryFn: ()=> getExamsAndResultActions(studentId, subjectName),
        enabled: tabValue === 'exams'
    });

    const { data: tasks} = useQuery({
        queryKey: ['tasks-student', studentId],
        queryFn: ()=> getTasksAction(studentId, groupId),
        enabled: tabValue === 'tasks'
    });

    const { data: attendances } = useQuery({
        queryKey: ['attendace-student', studentId],
        queryFn: ()=> getAttendanceAction(studentId, subjectName),
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
        </Card>
    </TabsContent>
  )
}
