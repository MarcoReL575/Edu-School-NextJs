'use client'

import { useModalStore } from "../store/useModalStore";
import ModalAssignGroup from "@/src/features/clases/components/ModalAssignGroup"
import ModalCreateClases from "@/src/features/clases/components/ModalCreateClases"
import ModalCreateGroup from "@/src/features/clases/components/ModalCreateGroup"
import ModalCreateStudent from "@/src/features/clases/components/ModalCreateStudent"
import ModalDeleteClases from "@/src/features/clases/components/ModalDeleteClases";
import ModalDeleteGroup from "@/src/features/clases/components/ModalDeleteGroup"
import ModalDeleteStudent from "@/src/features/clases/components/ModalDeleteStudent";
import ModalHorarios from "@/src/features/clases/components/ModalHorarios"
import ModalCreateTask from "@/src/features/tasks/components/ModalCreateTask";


// Diccionario de modales
const modalObject: any = {
  assignGroup: ModalAssignGroup,
  createClases: ModalCreateClases,
  createGroup: ModalCreateGroup,
  createStudent: ModalCreateStudent,
  modalDeleteGroup: ModalDeleteGroup,
  modalHorarios: ModalHorarios,
  modalDeleteClase: ModalDeleteClases,
  modalDeleteStudent: ModalDeleteStudent,
  modalCreateTask: ModalCreateTask
};

export const ModalProvider = () => {
  const { type, isOpen } = useModalStore();

  if (!isOpen || !type) return null;

  const ModalToRender = modalObject[type];

  return <ModalToRender />;
};