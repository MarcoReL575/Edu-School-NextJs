'use client'

import { Button } from "@/src/shared/components/ui/button";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { IconCirclePlus } from "@tabler/icons-react";

export default function ButtonOpenModalTask() {

    const openModal = useModalStore((state)=> state.openModal);

    const handleOpenModal = ()=> {
        openModal("modalCreateTask");
    }

  return (
    <Button onClick={handleOpenModal}>
        <IconCirclePlus />
        Crear nueva Tarea
    </Button>
  )
}
