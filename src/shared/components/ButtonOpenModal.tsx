'use client'

import { ModalType, useModalStore } from "../store/useModalStore";
import { Button } from "./ui/button";

type Props = {
    nameModal: ModalType;
    nameButton: string;
}

export default function ButtonOpenModal({ nameModal, nameButton }: Props) {
    const openModal = useModalStore((state)=> state.openModal)
  return (
    <Button onClick={() => openModal(nameModal)}>
        {nameButton}
    </Button>
  )
}
