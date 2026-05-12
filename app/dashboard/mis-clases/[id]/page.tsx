import { clasesServices } from "@/src/features/clases/services/ClasesServices";
import { teacherService } from "@/src/features/teachers/clases/teacherService"
import Heading from "@/src/shared/components/typography/Heading";
import { IconClockHour3 } from "@tabler/icons-react";

type Props = {
    params: Promise<{ id: string }>
}

export default async function ClasePage({ params }: Props) {
    const { id } = await params;
    const { subjectName, grade, group, level, id: claseId } = await teacherService.getAllInfoClase(id);

    const horariosList = await clasesServices.getHorarios(id);
    
  return (
    <>
        <Heading level={2} className="text-center">{subjectName}</Heading> 
        <p className="text-center">
            Grupo: {grade} {group} {level}
        </p>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-4 rounded-lg bg-gray-50 items-center justify-center py-4 border-2 border-gray-400">
                <p className="flex items-center gap-x-2"><IconClockHour3/><span>Horarios</span></p>
                {
                    horariosList.length 
                    ?   horariosList.map((horario)=> (
                            <p key={horario.id} className="p-2 capitalize bg-white w-xs flex items-center justify-between rounded-lg border-2 border-gray-300">
                            <span> {horario.dayOfWeek === 'miercoles' ? 'miércoles': horario.dayOfWeek}</span> <span>{horario.startTime}-{horario.endTime}</span>
                            </p>
                        ))
                    : <p>Aún no hay horarios para esta clase</p>
                }
            </div>
            <div className="flex flex-col gap-y-4 rounded-lg bg-gray-50 items-center justify-center py-4 border-2 border-gray-400">
                <p>Promedio General</p>
                <span>8.5</span>
            </div>
            
        </section>
    </>
  )
}
