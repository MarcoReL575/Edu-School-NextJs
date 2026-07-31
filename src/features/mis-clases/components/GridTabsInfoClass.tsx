import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import CardTabContent from "./CardTabContent";
import { studentsService } from "../../clases/services/StudentsService";
import { IconChecklist, IconClipboardList, IconListCheck, IconUsers } from "@tabler/icons-react";

type Props = {
    data: [] 
}

export async function GridTabsInfoClass({ data }: Props) {



    return (
        <Tabs defaultValue="studentsList" className="flex flex-col mx-auto w-full max-w-4xl space-y-4">
            <TabsList variant={'line'} className="space-x-4 p-2 border border-blue-600 mx-auto">
                <TabsTrigger value="studentsList" className="px-2"><IconUsers /> Alumnos Inscritos</TabsTrigger>
                <TabsTrigger value="tasksStudents" className="px-2"><IconClipboardList /> Tareas Asignadas</TabsTrigger>
                <TabsTrigger value="examsStudents" className="px-2"><IconChecklist /> Exámenes</TabsTrigger>
            </TabsList>
            <CardTabContent 
                data={data} 
                title="Alumnos Inscritos" 
                icon={<IconUsers />} 
                description="Lista de estudiantes" 
                tabValue="studentsList" 
            />
        </Tabs>

    )
}
