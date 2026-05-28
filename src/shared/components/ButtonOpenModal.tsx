'use client'

import { useTasksStore } from "@/src/features/tasks/store/useTasksStore";
import { ModalType, useModalStore } from "../store/useModalStore";
import { Button } from "./ui/button";
import { TaskDetails } from "@/src/features/tasks/types/types";

type Props = {
  nameModal: ModalType;
  nameButton: string;
  task?: TaskDetails;
  teacherId?: string;
  studentId?: string;
}

export default function ButtonOpenModal({ nameModal, nameButton, task, studentId, teacherId }: Props) {
  const openModal = useModalStore((state)=> state.openModal);
  const setStudentId = useTasksStore((state)=> state.setStudentId);
  const setTask = useTasksStore((state)=> state.setTask);
  const setTeacherId = useTasksStore((state)=> state.setTeacherId);

  const handleOpenModal = () => {
    if(task) setTask(task);
    if(studentId) setStudentId(studentId);
    if(teacherId) setTeacherId(teacherId);
    openModal(nameModal);
  }

  return (
    <Button onClick={handleOpenModal}>
      {nameButton}
    </Button>
  )
}
