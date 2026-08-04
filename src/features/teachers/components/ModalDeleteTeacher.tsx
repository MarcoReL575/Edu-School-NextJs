import { Description, Dialog, DialogPanel } from '@headlessui/react'
import { IconCircleX } from '@tabler/icons-react'
import Heading from '@/src/shared/components/typography/Heading'
import { useModalStore } from '@/src/shared/store/useModalStore'
import { Button } from '@/src/shared/components/ui/button';
import { deleteTeacherAction } from '../actions/teachersActions';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { TeachersInsertType } from '../types/types';

type Props = {
    slugTeacher: string;
    teacherInfo?: {
        name: string;
        lastName: string;
        level: string;
    };
}

export default function ModalDeleteTeacher({ slugTeacher, teacherInfo = { name: '', lastName: '', level: '' } }: Props) {
    console.log(teacherInfo)
    const isOpen = useModalStore((state)=> state.isOpen);
    const closeModal = useModalStore((state)=> state.closeModal);

    const handleCloseModal = () => { 
        closeModal();
    }

    const handleDeleteTeacher = async()=> {
        const { success, message } = await deleteTeacherAction(slugTeacher);
        if(!success) {
            toast.error(message);
            return
        }
        if(success) {
            toast.success(message);
            closeModal();
            redirect('/dashboard/maestros');
        }
    }

  return (
    <>
        <Dialog open={isOpen} onClose={handleCloseModal} className="relative z-50">
            <div className="fixed bg-black/60 inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="relative max-w-lg space-y-4 border bg-white p-12 rounded-lg">
                    <Heading level={2} className="font-bold ">
                        ¿Deseas Eliminar al Maestro?
                    </Heading>
                    <Description className="text-gray-500 text-center">
                        ¿Estas seguro que deseas eliminar al maestro?. 
                        <span className='font-semibold'> {teacherInfo.name} {teacherInfo.lastName} </span>
                        de <span className='font-semibold'>{teacherInfo.level}</span>.
                        Si continuas no podrás recuperar la información perdida
                    </Description>
                    <p className='w-full flex items-center justify-end space-x-4'> 
                        <Button>Cancelar</Button>
                        <Button variant={'destructive'} onClick={handleDeleteTeacher}>Si, eliminar</Button>
                    </p>
                    <button type='button' onClick={handleCloseModal} className=' absolute top-6 right-6 cursor-pointer text-red-500 hover:scale-125 transition-all duration-300 ease-in hover:text-red-300'>
                        <IconCircleX size={35} />
                    </button>
                </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}
