import Link from "next/link";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ArrowLeftCircle } from "lucide-react";
import TableAttendance from "@/src/features/attendance/components/TableAttendance";
import { clasesServices } from "@/src/features/clases/services/ClasesServices";
import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";
import { ClasesInfoByAttendance } from "@/src/features/clases/types/types";

type Props = {
  params: Promise<{ slug: string }>
}

export default async function AttendancePageClass({ params }: Props) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const { clase } = await clasesServices.getInfoClaseBySlug(slug);

  await queryClient.prefetchQuery({
    queryKey: ['attendance', slug],
    queryFn:  ()=> clasesServices.getInfoClasesAttendance(slug),
  });

  const cachedData = queryClient.getQueryData<{ success: boolean, message: string, infoClases: ClasesInfoByAttendance}>( ['attendance', slug]);
  const infoClases = cachedData?.infoClases

  if(!infoClases?.students) return <div>No se encontró la información</div>;

  const studentsCount = infoClases.students.length

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex items-center justify-around" >
        <Button variant={"outline"} className="w-fit">
          <Link href={'/dashboard/attendance'} className="flex items-center gap-x-2 w-fit">
            <ArrowLeftCircle />
            <span>Volver</span>
          </Link>
        </Button>
        <div className="space-y-2">
          <p>{infoClases?.grade} {infoClases.group} {infoClases.level}</p>
          <Heading level={2}>{infoClases.subjectName}</Heading>
        </div>
        <div className=" px-2 border border-gray-400 bg-gray-100 flex rounded-lg overflow-hidden gap-x-4">
          <div className="flex flex-col p-2 items-center justify-center">
            <p>Inscritos</p>
            <p>{studentsCount}</p>
          </div>
          <div className="flex flex-col border-r border-l border-gray-400 p-2 items-center justify-center">
            <p>Presentes</p>
            <p>5</p>
          </div>
          <div className="p-2 flex flex-col items-center justify-center">
            <p>Faltas</p>
            <p>0</p>
          </div>
        </div>
      </section>
      <TableAttendance students={infoClases.students} claseId={clase.id} />
    </HydrationBoundary>
  )
}
