'use client'

import { QueryClient } from "@tanstack/react-query";
import { useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { submitTaskAction } from "../actions/tasksAction";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { Form, FormLabel, FormSubmit } from "@/src/shared/components/form";
import { UploadButton } from "@/src/shared/utils/uploadthing";
import { useTasksStore } from "../store/useTasksStore";
import { StudentSubmissionSchema } from "../schemas/schemas";
import { StudentSubmissionInput } from "../types/types";

export default function FormSubmittedTask() {
    const taskId = useTasksStore((state)=> state.taskId);
    const closeModal = useModalStore((state)=> state.closeModal);
    const queryClient = new QueryClient();
    const { getValues, setValue, handleSubmit, formState: { isSubmitting, errors }, control } = useForm<StudentSubmissionInput>({
        resolver: zodResolver(StudentSubmissionSchema),
        defaultValues: {
            taskId: taskId?? 0,
            attachments: [],
        }
    });

    const attachments = useWatch({
        control, // Obtenido de useForm
        name: "attachments",
    });

    const handleSubmitTask = async(data: StudentSubmissionInput)=> {
        const { success, message } = await submitTaskAction(data);
        if(!success) {
            toast.error(message);
        } 
        if(success) {
            toast.success(message);
            closeModal();
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    }

    if(!taskId) return <p className="text-red-500">No se pudo cargar la información de la tarea, vuelve a intentarlo</p>

  return (
    <Form onSubmit={handleSubmit(handleSubmitTask)}>
        <UploadButton 
            endpoint="fileUploader"
            appearance={{
                button: "ut-ready:bg-green-500 ut-ready:hover:bg-green-400 ut-uploading:cursor-not-allowed bg-red-500 bg-none after:bg-orange-400",
                container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                allowedContent: "hidden",
            }}
            content={{
                button({ready, isUploading}) {
                    if(isUploading) return 'Subiendo';
                    if(ready) return 'Subir Archivos';
                    return 'Cargando...'; 
                },
                allowedContent: null,
            }}
            onClientUploadComplete={(res) => {
                const currentAttachments = getValues("attachments") || [];
                const newAttachments = res.map((file: any) => ({
                    fileUrl: file.ufsUrl,
                    fileName: file.name,
                    fileType: file.type
                }));
                const updatedAttachments = [...currentAttachments, ...newAttachments];
                setValue("attachments", updatedAttachments);
                toast.success(`${res.length} archivo(s) añadido(s) con éxito.`);
            }}  
            onUploadError={(error) => {
                toast.error('Error al subir los archivos');
                console.error(error);  
            }}
        />
        <ul>
            {(attachments ?? []).map((file, index) => (
                <li key={index}>{file.fileName}</li>
            ))}
        </ul>
        <FormLabel htmlFor="file" className="text-gray-500">Puedes subir archivos pdfs, word, excel o imágenes.</FormLabel>
        <FormSubmit
            type="submit"
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Enviando...' : 'Entregar Tarea'}
        </FormSubmit>
    </Form>
  )
}