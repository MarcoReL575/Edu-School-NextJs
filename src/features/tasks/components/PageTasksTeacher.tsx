import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getTasksTeacherAction } from "../actions/tasksAction";
import GridTaskTeacher from "./GridTaskTeacher";

type Props = {
    teacherId: string
}

export default async function PageTasksTeacher({ teacherId }:Props) {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['tasksList', teacherId],
        queryFn: ()=> getTasksTeacherAction(teacherId),
    });
   
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <GridTaskTeacher teacherId={teacherId} />
    </HydrationBoundary>
  )
}