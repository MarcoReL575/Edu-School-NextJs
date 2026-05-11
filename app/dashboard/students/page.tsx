import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { getListStudentsAction } from "@/src/features/clases/actions/studentsActions";
import TableStudents from "@/src/features/clases/components/TableStudents";

export const metadata: Metadata = {
  title: 'Edu-School: Estudiantes'
};

export default async function StudentsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['studentsList'],
    queryFn: getListStudentsAction,
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)} >
        <TableStudents />
      </HydrationBoundary>
    </>
  )
}