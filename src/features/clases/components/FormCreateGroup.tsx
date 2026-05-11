import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormError, FormLabel, FormSubmit } from "@/src/shared/components/form";
import { CreateGroupSchema } from "../schema/clasesSchemas";
import { useGroupStore } from "../store/useGroupStore";
import { GroupInsertType, GroupSelectType } from "../types/types"
import { createGroupAction, setGroupAction } from "../actions/groupActions";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/src/shared/store/useModalStore";

export default function FormCreateGroup() {

    const grades = [ 
        { label: '1°', value: '1°' }, { label: '2°', value: '2°' }, { label: '3°', value: '3°' },
        { label: '4°', value: '4°' }, { label: '5°', value: '5°' }, { label: '6°', value: '6°' }
    ];

    const groups = [
        { label: 'A', value: 'A' }, { label: 'B', value: 'B' }, { label: 'C', value: 'C' }, 
        { label: 'D', value: 'D' }, { label: 'E', value: 'E' }, { label: 'F', value: 'F' }
    ];

    const queryClient = useQueryClient();

    const currentGroup = useGroupStore((state)=> state.currentGroup);
    const setGroup = useGroupStore((state)=> state.setGroup);
    const closeModal = useModalStore((state)=> state.closeModal);

    const { register, handleSubmit, formState: { errors } } = useForm<GroupInsertType>({
        resolver: zodResolver(CreateGroupSchema),
        mode: 'onBlur',
        defaultValues: {
            id: currentGroup.id?? null, 
            grade: currentGroup.grade?? '', 
            group: currentGroup.group?? '',
            level: currentGroup.level?? ''
        }
    });

    const groupMutation = useMutation({
        mutationFn: async (data: GroupInsertType)=> {
            if(currentGroup.id){
                return await setGroupAction({ id: currentGroup.id, ...data})
            }
            return await createGroupAction(data)
        },
        onSuccess: (response)=> {
            if(response.success) {
                toast.error(response.message)
                queryClient.invalidateQueries({ queryKey: ['groupList'] });
                setGroup({} as GroupSelectType);
                closeModal();
            } else {
                toast.success(response.message);
            }
        },
        onError: ()=> {
            toast.error("Ocurrió un error inesperado al procesar el grupo");
        }
    });

    const handleCreateGroup= async(data: GroupInsertType)=> {
        groupMutation.mutate(data);
    };

  return (
    <Form className="flex flex-col space-y-4" onSubmit={handleSubmit(handleCreateGroup)}>

        <div className="flex flex-col">
            <FormLabel htmlFor="grade">Grado</FormLabel>
            <select {...register('grade')} id="grade" className="border p-2 rounded-lg">
                <option value="">--Selecciona un Grado--</option>
                {grades.map((grade)=> (
                    <option key={grade.value} value={grade.value}>{grade.label}</option>
                ))}
            </select>
            {errors.grade && <FormError>{errors.grade.message}</FormError>}
        </div>

        <div className="flex flex-col">
            <FormLabel htmlFor="group" >Grupo</FormLabel>
            <select {...register('group')} id="group" className="border p-2 rounded-lg">
                <option value="">--Selecciona un Grupo--</option>
                {groups.map((group)=> (
                    <option key={group.value} value={group.value}>{group.label}</option>
                ))}
            </select>
            {errors.group && <FormError>{errors.group.message}</FormError>}
        </div>

        <div className="flex flex-col">
            <FormLabel htmlFor="level" >Nivel Académico</FormLabel>
            <select {...register('level')} id="level" className="border p-2 rounded-lg">
                <option value="">--Selecciona un Nivel--</option>
                <option value="secundaria">Secundaria</option>
                <option value="preparatoria">Preparatoria</option>
            </select>
            {errors.level && <FormError>{errors.level.message}</FormError>}
        </div>

        <FormSubmit>Crear Grupo</FormSubmit>
    </Form>
  )
}