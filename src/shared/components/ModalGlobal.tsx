'use client'

import { useModalStore } from "../store/useModalStore";
import ModalAssignGroup from "@/src/features/clases/components/ModalAssignGroup"
import ModalCreateClases from "@/src/features/clases/components/ModalCreateClases"
import ModalCreateGroup from "@/src/features/clases/components/ModalCreateGroup"
import ModalCreateStudent from "@/src/features/students/components/ModalCreateStudent"
import ModalDeleteClases from "@/src/features/clases/components/ModalDeleteClases";
import ModalDeleteGroup from "@/src/features/clases/components/ModalDeleteGroup"
import ModalDeleteStudent from "@/src/features/students/components/ModalDeleteStudent";
import ModalHorarios from "@/src/features/clases/components/ModalHorarios"
import ModalCreateTask from "@/src/features/tasks/components/ModalCreateTask";
import ModalGradeTask from "@/src/features/tasks/components/ModalGradeTask";
import ModalSubmittedTask from "@/src/features/tasks/components/ModalSubmittedTask";
import ModalDeleteTeacher from "@/src/features/teachers/components/ModalDeleteTeacher";


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
  modalCreateTask: ModalCreateTask,
  modalSubmittedTask: ModalSubmittedTask,
  modalGradeTask: ModalGradeTask,
  modalDeleteTeacher: ModalDeleteTeacher
};

export const ModalProvider = () => {
  const { type, isOpen } = useModalStore();

  if (!isOpen || !type) return null;

  const ModalToRender = modalObject[type];

  return <ModalToRender />;
};