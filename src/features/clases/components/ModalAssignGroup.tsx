'use client'

import { Description, Dialog, DialogPanel } from '@headlessui/react';
import { IconCircleX } from '@tabler/icons-react';
import Heading from '@/src/shared/components/typography/Heading';
import FormAssignStudentInAGroup from './FormAssignStudentInAGroup';
import { useModalStore } from '@/src/shared/store/useModalStore';

export default function ModalAssignGroup() {
    const isOpen = useModalStore((state) => state.isOpen);
    const closeModal = useModalStore((state) => state.closeModal);
    
    return (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            <div className="fixed bg-black/60 inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="relative max-w-lg space-y-4 border bg-white p-12 rounded-lg">
                <Heading level={2} className="font-bold">Asigna un grupo al Alumno</Heading>
                <Description className="text-gray-500">Organiza tus clases. Crea o edita clases escolares</Description>
                <FormAssignStudentInAGroup />
                <button type='button' onClick={closeModal} className=' absolute top-6 right-6 cursor-pointer text-red-500 hover:scale-125 transition-all duration-300 ease-in hover:text-red-300'>
                    <IconCircleX size={35} />
                </button>
            </DialogPanel>
            </div>
        </Dialog>
    )
}



