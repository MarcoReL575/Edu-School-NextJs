'use client'

import { Description, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import Heading from '@/src/shared/components/typography/Heading';
import FormHorarios from './FormHorarios';
import { Button } from '@/src/shared/components/ui/button';
import { useClasesStore } from '../store/useClasesStore';
import { HorariosSelectType } from '../types/types';
import { useModalStore } from '@/src/shared/store/useModalStore';


export default function ModalHorarios() {

    const isOpen = useModalStore((state) => state.isOpen);
    const closeModal = useModalStore((state) => state.closeModal);
    const setHorarioClase = useClasesStore((state)=> state.setHorarioClase)

    const handleCloseModal = ()=> {
        closeModal();
        setHorarioClase({} as HorariosSelectType );
    }

    return (
        <>
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <DialogBackdrop className='fixed inset-0 bg-black/40' />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="max-w-lg space-y-4 border rounded-lg bg-white p-12">
                            <Heading level={2} className='text-center'>Horarios de la materia </Heading>
                            <Description className='text-gray-500 text-sm'>
                                En esta sección podrás ver y modificar los horarios de la materia: 
                            </Description>
                            <div>
                                <FormHorarios />
                            </div>
                            <div className="flex gap-4">
                                <Button 
                                    variant='destructive' 
                                    className='w-full text-white bg-red-500 font-semibold py-5 text-lg' 
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}