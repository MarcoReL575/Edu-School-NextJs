import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Heading from "@/src/shared/components/typography/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import { getTutorChildrenAction } from "@/src/features/parents/actions/parentsActions";
import { getAttendancesByStudentAction } from "../actions/attendanceActions";
import TableStudentAttendance from "./TableStudentAttendance";

export default async function AttendanceTutorSection() {
    const children = await getTutorChildrenAction();

    if (children.length === 0) {
        return (
            <>
                <Heading level={2}>Asistencias</Heading>
                <p className="text-center mt-5">Aún no tienes hijos(as) vinculados a tu cuenta.</p>
            </>
        )
    }

    const queryClient = new QueryClient();
    await Promise.all(
        children.map((child) =>
            queryClient.prefetchQuery({
                queryKey: ['attendance-student', child.id],
                queryFn: () => getAttendancesByStudentAction(child.id),
            })
        )
    );

    return (
        <>
            <Heading level={2}>
                {children.length === 1
                    ? 'Lleva un control de las asistencias de tu hijo(a).'
                    : 'Lleva un control de las asistencias de tus hijos(as).'
                }
            </Heading>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {children.length === 1 ? (
                    <TableStudentAttendance studentId={children[0].id} />
                ) : (
                    <Tabs defaultValue={children[0].id} className="flex flex-col">
                        <TabsList variant="line" className="mx-auto border rounded-lg border-gray-600 bg-gray-100 p-2">
                            {children.map((child) => (
                                <TabsTrigger key={child.id} value={child.id}>
                                    {child.name} {child.lastName}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {children.map((child) => (
                            <TabsContent key={child.id} value={child.id}>
                                <TableStudentAttendance studentId={child.id} />
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </HydrationBoundary>
        </>
    )
}
