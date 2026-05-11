'use client'

import { IconCirclePlus, IconClock, IconEdit, IconTrash } from "@tabler/icons-react";
import Heading from "@/src/shared/components/typography/Heading";
import { ClasesInfoComplete, HorariosClases, HorariosInsertType, HorariosSelectType } from "../types/types";
import { useClasesStore } from "../store/useClasesStore";
import { Button } from "@/src/shared/components/ui/button";
import { Separator } from "@/src/shared/components/ui/separator";
import { useModalStore } from "@/src/shared/store/useModalStore";

type Props = {
  clase: ClasesInfoComplete;
  horarios: HorariosSelectType[];
}

export default function InfoClase({ clase, horarios }: Props) {

  const { grado, group, level, subject, teacher } = clase;
  const openModal = useModalStore((state) => state.openModal);
  const setHorarioClase = useClasesStore((state) => state.setHorarioClase)

  const handleCreateHorario = ()=> {
    setHorarioClase({} as HorariosSelectType)
    openModal('modalHorarios');
  }

  const handleEditHorario = (horario: HorariosSelectType) => {
    setHorarioClase(horario)
    openModal('modalHorarios');
  }

  const handleDeleteHorario = (horario: HorariosSelectType)=> {
    setHorarioClase(horario)
    openModal('modalDeleteClase', horario.id );
  }

  return (
    <section className='flex w-full max-w-2xl'>
      <div className='p-10 rounded-lg flex flex-col bg-gray-50 space-y-8 w-full'>
        <div className='w-full text-center'>
          <Heading level={3}>{subject}</Heading>
          <p>Grupo: {grado} {group} {level}</p>
        </div>
        <div className='flex items-center justify-center'>
          <div>

          </div>
          <div>
            <p className=''>Maestro Asignado</p>
            <p className='text-gray-500'>{teacher}</p>
          </div>
        </div>
        <div className='flex flex-col space-y-2'>
          <div className='flex gap-x-2 items-center justify-between w-full'>
            <div className="flex gap-x-4">
              <IconClock /><span>Horario Semanal</span>
            </div>

            <Button onClick={handleCreateHorario} >
              <IconCirclePlus />
              Agregar Horario
            </Button>
          </div>
          <Separator className="my-5" />
          {horarios.length > 0
            ? horarios.map((horario) => (
              <div key={horario.id} className='w-full border rounded-lg grid grid-cols-3 px-4 py-2 bg-white'>
                <div className=' capitalize'>{horario.dayOfWeek === 'miercoles' ? 'miércoles' : horario.dayOfWeek}</div>
                <div className='flex gap-x-2'> <span>{horario.startTime}</span> - <span>{horario.endTime}</span></div>
                <div className='flex gap-x-2 items-end justify-end'>
                  <button onClick={() => handleEditHorario(horario)}>
                    <IconEdit className="text-blue-500 hover:text-blue-400 hover:scale-125 transition-all duration-300 ease-in cursor-pointer" />
                  </button>
                  <button onClick={()=> handleDeleteHorario(horario)}>
                    <IconTrash className="text-red-500 hover:text-red-400 hover:scale-125 transition-all duration-300 ease-in cursor-pointer" />
                  </button>
                </div>
              </div>
            ))
            : <div className="text-lg text-center mt-4">
              Aún no hay horarios para esta clase
            </div>
          }
        </div>
      </div>
    </section>
  )
}
