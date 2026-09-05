import { Description, Dialog, DialogPanel } from '@headlessui/react'
import { IconCircleX } from '@tabler/icons-react'
import Heading from '@/src/shared/components/typography/Heading'
import FormCreateStudent from './FormCreateStudent'
import { useModalStore } from '@/src/shared/store/useModalStore'
import { useStudentStore } from '../store/useStudentStore'
import { CreateStudent } from '../schemas/studentsSchemas'


export default function ModalCreateStudent() {

    const isOpen = useModalStore((state)=> state.isOpen);
    const closeModal = useModalStore((state)=> state.closeModal);
    const setStudent = useStudentStore((state)=> state.setStudent);

    const hadnleCloseModal = ()=> {
        closeModal();
        setStudent({} as CreateStudent );
    }

  return (
    <>
        
        <Dialog open={isOpen} onClose={hadnleCloseModal} className="relative z-50">
            <div className="fixed bg-black/60 inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="relative max-w-lg space-y-4 border bg-white p-12 rounded-lg">
                <Heading level={2} className="font-bold">Da de alta a un nuevo alumno</Heading>
                <Description className="text-gray-500">Añade la información necesaria para poder añadir a tus alumnos</Description>
                <FormCreateStudent />
                <button type='button' onClick={hadnleCloseModal} className=' absolute top-6 right-6 cursor-pointer text-red-500 hover:scale-125 transition-all duration-300 ease-in hover:text-red-300'>
                    <IconCircleX size={35} />
                </button>
            </DialogPanel>
            </div>
        </Dialog>
    </>
  )
}