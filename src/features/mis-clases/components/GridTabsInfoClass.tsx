import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import CardTabContent from "./CardTabContent";
import { studentsService } from "../../students/services/StudentsService";
import { IconChecklist, IconClipboardList, IconListCheck, IconUsers } from "@tabler/icons-react";
import { taskService } from "../../tasks/services/taskService";
import { teacherService } from "../../teachers/services/teacherService";
import { requireAuth } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";
import { examService } from "../../examenes/services/examService";

type Props = {
    data: [];
    claseId: string;
}

export async function GridTabsInfoClass({ data, claseId }: Props) {
    const { session } = await requireAuth();
    if(!session.user) redirect('/auth/signin');
    const { teacher } = await teacherService.getTeacherByUserId(session.user.id);
    const allTasks = await taskService.getTasksTeacher(teacher.id);
    const tasksByClass = allTasks.filter((task)=> task.claseId === claseId);
    
    const examsByClass = await examService.getExamsByClass(claseId, teacher.id);
    console.log({examsByClass})

    return (
        <Tabs defaultValue="studentsList" className="flex flex-col mx-auto w-full max-w-4xl space-y-4">
            <TabsList variant={'line'} className="space-x-4 p-2 border border-blue-600 mx-auto">
                <TabsTrigger value="studentsList" className="px-2"><IconUsers /> Alumnos Inscritos</TabsTrigger>
                <TabsTrigger value="taskClasesList" className="px-2"><IconClipboardList /> Tareas Asignadas</TabsTrigger>
                <TabsTrigger value="examsList" className="px-2"><IconChecklist /> Exámenes</TabsTrigger>
            </TabsList>
            <CardTabContent 
                data={data} 
                title="Alumnos Inscritos" 
                icon={<IconUsers />} 
                description="Lista de estudiantes" 
                tabValue="studentsList" 
            />
            <CardTabContent 
                data={tasksByClass as []} 
                title="Lista de Tareas" 
                icon={<IconClipboardList />} 
                description="Lista de todas las tareas que se han dejado en el curso" 
                tabValue="taskClasesList" 
            />
            <CardTabContent 
                data={examsByClass as []} 
                title="Lista de Exámenes" 
                icon={<IconChecklist />} 
                description="Lista de todos los exámenes que se han dejado en el curso" 
                tabValue="examsList" 
            />
        </Tabs>
    )
}
