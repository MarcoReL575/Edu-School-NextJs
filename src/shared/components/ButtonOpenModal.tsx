'use client'

import { useTasksStore } from "@/src/features/tasks/store/useTasksStore";
import { ModalType, useModalStore } from "../store/useModalStore";
import { Button } from "./ui/button";

type Props = {
  nameModal: ModalType;
  nameButton: string;
  taskId?: number;
  studentId?: string;
}

export default function ButtonOpenModal({ nameModal, nameButton, taskId, studentId }: Props) {
  const openModal = useModalStore((state)=> state.openModal);
  const setStudentId = useTasksStore((state)=> state.setStudentId);
  const setTaskId = useTasksStore((state)=> state.setTaskId);

  const handleOpenModal = () => {
    if(taskId) setTaskId(taskId);
    if(studentId) setStudentId(studentId);
    openModal(nameModal);
  }

  return (
    <Button onClick={handleOpenModal}>
        {nameButton}
    </Button>
  )
}
