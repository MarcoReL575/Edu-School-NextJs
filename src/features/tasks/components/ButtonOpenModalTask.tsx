'use client'

import { Button } from "@/src/shared/components/ui/button";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { IconCirclePlus } from "@tabler/icons-react";
import { getTeachersSubjectsAction } from "../../teachers/actions/teachersActions";
import { useTasksStore } from "../store/useTasksStore";

type Props = {
  teacherId: string;
}

export default function ButtonOpenModalTask({ teacherId }: Props) {
  const openModal = useModalStore((state)=> state.openModal);
  const setteachersClases = useTasksStore((state)=> state.setteachersClases);
  const setTeacherId = useTasksStore((state)=> state.setTeacherId);

  const handleOpenModal = async()=> {
    const { success, clases } = await getTeachersSubjectsAction();
    if(success) {
      setteachersClases(clases);
      setTeacherId(teacherId);
      openModal("modalCreateTask");
    }
  }

  return (
    <Button onClick={handleOpenModal}>
      <IconCirclePlus />
      Crear nueva Tarea
    </Button>
  )
}
