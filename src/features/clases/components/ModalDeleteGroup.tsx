'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Description, Dialog, DialogPanel } from '@headlessui/react'
import { IconAlertCircle, IconCircleX } from '@tabler/icons-react';
import { deleteGroupAction } from '../actions/groupActions';
import { useGroupStore } from '../store/useGroupStore';
import Heading from '@/src/shared/components/typography/Heading';
import { Button } from '@/src/shared/components/ui/button';
import { useModalStore } from '@/src/shared/store/useModalStore';
import { GroupSelectType } from '../types/types';

export default function ModalDeleteGroup() {
    const queryClient = useQueryClient();
    
    const setGroup = useGroupStore((state)=> state.setGroup);
    const currentGroup = useGroupStore((state)=> state.currentGroup);
    const isOpen = useModalStore((state) => state.isOpen);
    const closeModal = useModalStore((state) => state.closeModal);

    const deleteMutation = useMutation({
        mutationFn: async()=> { 
            const result = await deleteGroupAction(currentGroup.id) 
            return result
        },
        onSuccess: (response) =>  {
            if(!response.success) {
                toast.error(response.message);
            }
            if(response.success) {
                toast.success(response.message);
                closeModal();
                queryClient.invalidateQueries({ queryKey: ['groupList'] });
                setGroup({} as GroupSelectType );
            }
        },
        onError: ()=> {
            toast.error("Ocurrió un error inesperado al eliminar el grupo");
        }
    });

    return (
        <>
            <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
                <div className="fixed bg-black/60 inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="relative max-w-lg space-y-2 border bg-white p-12 rounded-lg">
                        <Heading level={4} className="font-bold flex items-center space-x-4 text-center">
                            <IconAlertCircle className='text-yellow-600' size={30} />
                            <p>¡Estás tratando de eliminar un grupo!</p>
                        </Heading>
                        <div>
                            <span>¿Seguro que deseas elimminar el grupo? </span>
                            <span>{currentGroup.grade} {currentGroup.group} de {currentGroup.level}</span>
                        </div>
                        <Description className="text-gray-500 text-center">
                            Recuerda que si eliminas el grupo perderás toda la información que tiene.
                            ¿Deseas Continuar?
                        </Description>
                        <button type='button' onClick={closeModal} className=' absolute top-6 right-6 cursor-pointer text-red-500 hover:scale-125 transition-all duration-300 ease-in hover:text-red-300'>
                            <IconCircleX size={35} />
                        </button>
                        <div className='grid grid-cols-2 gap-10'>
                            <Button variant='destructive' onClick={closeModal}>Cancelar</Button>
                            <Button 
                                className='bg-red-500 hover:bg-red-400 ' 
                                onClick={()=> deleteMutation.mutate()}
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar Grupo'}
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}