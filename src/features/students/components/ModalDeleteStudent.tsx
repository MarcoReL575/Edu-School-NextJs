import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { Description, Dialog, DialogPanel } from "@headlessui/react";
import { IconAlertCircle, IconCircleX } from "@tabler/icons-react";
import { useStudentStore } from "../store/useStudentStore";
import { deleteStudentAction } from "../actions/studentsActions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function ModalDeleteStudent() {

  const isOpen = useModalStore((state)=> state.isOpen);
  const closeModal = useModalStore((state)=> state.closeModal);
  const currentStudent = useStudentStore((state)=> state.currentStudent);

  const handleDeleteStudent = async()=> {
    if(!currentStudent.id) return
    const { success, message } = await deleteStudentAction(currentStudent.id);
    if(!success) {
      toast.error(message);
    }
    if(success){
      toast.success(message);
      closeModal();
      redirect('/dashboard/students');
    }
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed bg-black/60 inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="relative max-w-lg space-y-4 border bg-white p-12 rounded-lg">
          <Heading level={4} className="font-bold flex items-center space-x-4">
            <IconAlertCircle className='text-yellow-600' size={30} />
            <p>¡Eliminando Estudiante!</p>
          </Heading>
          <div className="w-full text-center">
            <p>¿Seguro que deseas elimminar al estudiante? </p>
            <p>{currentStudent.lastName} {currentStudent.name}</p>
          </div>
          <Description className="text-gray-500 text-start w-full">
            Recuerda que si eliminas al estudinate perderás toda la información de él
            ¿Deseas Continuar?
          </Description>
          <button type='button' onClick={closeModal} className=' absolute top-6 right-6 cursor-pointer text-red-500 hover:scale-125 transition-all duration-300 ease-in hover:text-red-300'>
            <IconCircleX size={35} />
          </button>
          <div className='grid grid-cols-2 gap-10'>
            <Button variant='destructive' onClick={closeModal}>Cancelar</Button>
            <Button
              className='bg-red-500 hover:bg-red-400 '
              onClick={handleDeleteStudent}
            >
              Si, Eliminar Estudiante
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
