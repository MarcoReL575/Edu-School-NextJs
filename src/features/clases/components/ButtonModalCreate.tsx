// 'use client'

// import { Description, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
// import { IconCircleCheck } from '@tabler/icons-react';
// import { useModalGroup } from "../store/useModalGroup";
// import { Button } from '@/src/shared/components/ui/button';
// import Heading from '@/src/shared/components/typography/Heading';
// import { TypeAction } from '../types/types';
// import FormCreateClases from './FormCreateClases';

// type Props = {
//     name: string;
//     action: TypeAction;
// }


// export function ButtonModalCreate({ name, action }: Props) {
//     const stateModal = useModalGroup((state)=> state.stateModal);
//     const setOpenModal = useModalGroup((state)=> state.setOpenModal);
//     const setCloseModal = useModalGroup((state)=> state.setCloseModal);

//     return (
//         <>
//             <Button
//                 onClick={()=> setOpenModal('create')}
//                 className='flex gap-x-2 hover:bg-black/70'
//             >
//                 <IconCircleCheck />
//                 {name}
//             </Button>

//             <Dialog open={stateModal} onClose={()=> setCloseModal('create')} className="relative z-50">
//                 <DialogBackdrop className='fixed inset-0 bg-black/40' />
//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-center justify-center p-4">
//                         <DialogPanel className="max-w-lg space-y-4 border rounded-lg bg-white p-12">
//                             <Heading level={2} className='text-center'>
//                                 {action === 'clase' && 'Crar Nueva Clase'}
//                                 {action === 'grupo' && 'Crar Nuevo Grupo'}
//                                 <p  className='text-gray-500 text-center'>
//                                     {action === 'clase' && 'En este apartado podrás dar de alta una nueva clase'}
//                                     {action === 'grupo' && 'En este apartado podrás crear un nuevo grupo'}
//                                 </p>
//                             </Heading>
//                             <div>
//                                 <FormCreateClases  />
//                             </div>
//                             <div className="flex gap-4">
//                                 <Button variant={'destructive'} onClick={()=> setCloseModal('create')}>Cancel</Button>
//                             </div>
//                         </DialogPanel>
//                     </div>
//                 </div>
//             </Dialog>
//         </>
//     )
// }