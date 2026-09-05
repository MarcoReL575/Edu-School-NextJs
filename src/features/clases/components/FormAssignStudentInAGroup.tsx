import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { assignGroupToStudentAction } from "../../group/actions/groupActions";
import { Form, FormLabel, FormSubmit } from "@/src/shared/components/form";
import SelectGroups from "./SelectGroups";
import { AssignGroupSchema, AssignGroupType } from "../../group/schemas/groupSchemas";
import { useClasesStore } from "../store/useClasesStore";
import { useGroupStore } from "../../group/store/useGroupStore";
import { useModalStore } from "@/src/shared/store/useModalStore";


export default function FormAssignStudentInAGroup() {

    const userId = useClasesStore((state)=> state.userId);
    const closeModal = useModalStore((state)=> state.closeModal);
    

    const methods = useForm<AssignGroupType>({
        resolver: zodResolver(AssignGroupSchema),
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({ 
        mutationKey: ['studentsList'],
        mutationFn: async(data: AssignGroupType)=> {
            const result = await assignGroupToStudentAction(userId, data.groupId)
            if(!result.success) throw new Error(result.message);
            return result
        },
        onSuccess: (result)=> {
            toast.success(result.message),
            queryClient.invalidateQueries({ queryKey: ['studentsList'] }),
            closeModal();
            methods.reset();
        },
        onError: (error: any) => {
            toast.error(error.message || "Ocurrió un error al asignar el grupo")
        }
    })

    const handleAssignGroup = (data: AssignGroupType) => {
        mutate(data);
    }

  return (
    <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(handleAssignGroup)}>
            <FormLabel>Selecciona Un grupo</FormLabel>
            <SelectGroups />
    
            <FormSubmit disabled={isPending}>{isPending ? 'Asignando...' : 'Asignar al Grupo'}</FormSubmit>
        </Form>
    </FormProvider>
  )
}