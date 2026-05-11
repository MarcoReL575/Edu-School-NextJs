import Heading from '@/src/shared/components/typography/Heading'
import { Button } from '@/src/shared/components/ui/button'
import { useModalStore } from '@/src/shared/store/useModalStore'
import { Description, Dialog, DialogPanel } from '@headlessui/react'
import { IconAlertCircle, IconCircleX } from '@tabler/icons-react'
import { useClasesStore } from '../store/useClasesStore'
import { HorariosSelectType } from '../types/types'
import { deleteHorarioClaseAciton } from '../actions/clasesAction'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

export default function ModalDeleteClases() {

    const isOpen = useModalStore((state) => state.isOpen);
    const closeModal = useModalStore((state) => state.closeModal);
    const horarioClase = useClasesStore((state)=> state.horarioClase);
    const setHorarioClase = useClasesStore((state)=> state.setHorarioClase);

    const handleDeleteHorario = async() =>{ 
        const { success, message } = await deleteHorarioClaseAciton(horarioClase.id);
        if(!success){
            toast.error(message);
        }
        if(success){
            toast.success(message);
            closeModal();
            redirect(`/dashboard/clases/${horarioClase.claseId}`); 
        }
    }

    const handleCloseModal = ()=>{
        closeModal();
        setHorarioClase({} as HorariosSelectType)
    }


  return (
    <Dialog open={isOpen} onClose={handleCloseModal} className="relative z-50">
        <div className="fixed bg-black/60 inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="relative max-w-lg space-y-2 border bg-white p-12 rounded-lg">
                <Heading level={4} className="font-bold flex items-center space-x-4 text-center">
                    <IconAlertCircle className='text-yellow-600' size={30} />
                    <p>¡Estás tratando de eliminar una clase!</p>
                </Heading>
                <div className='text-center'>
                    <p>¿Seguro que deseas elimminar la clase? </p>
                    <p className=' capitalize'>{horarioClase.dayOfWeek} {horarioClase.startTime}-{horarioClase.endTime}</p>
                </div>
                <Description className="text-gray-500 text-center">
                    Recuerda que si eliminas la clase perderás toda la información que tiene.
                    ¿Deseas Continuar?
                </Description>
                <button type='button' onClick={closeModal} className=' absolute top-6 right-6 cursor-pointer text-red-500 hover:scale-125 transition-all duration-300 ease-in hover:text-red-300'>
                    <IconCircleX size={35} />
                </button>
                <div className='grid grid-cols-2 gap-10'>
                    <Button variant='destructive' onClick={closeModal}>Cancelar</Button>
                    <Button 
                        className='bg-red-500 hover:bg-red-400'
                        onClick={handleDeleteHorario} 
                    >
                        Eliminar Clase
                    </Button>
                </div>
            </DialogPanel>
        </div>
    </Dialog>
  )
}
