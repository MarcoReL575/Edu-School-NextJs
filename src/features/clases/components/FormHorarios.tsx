import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { IconCheck } from "@tabler/icons-react";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/form";
import { daysOfWeek } from "@/src/shared/data/daysOfWeek";
import { HorariosInsertType } from "../types/types";
import { CreateHorarioSchema } from "../schema/clasesSchemas";
import { createHorarioClaseAction, editHorarioClaseAction, getClaseBySlugAction } from "../actions/clasesAction";
import { useClasesStore } from "../store/useClasesStore";
import { Route } from "next";
import { useModalStore } from "@/src/shared/store/useModalStore";

export default function FormHorarios() {

    const days = daysOfWeek;
    const horarioClase = useClasesStore((state)=> state.horarioClase);
    const isOpen = useModalStore((state) => state.isOpen);
    const closeModal = useModalStore((state) => state.closeModal);
    const claseId = useClasesStore((state)=> state.claseId);
    const type = useModalStore((state) => state.type);
    const params = useParams();
    const slug = params?.slug as string;

    const { register, reset, handleSubmit, formState: { errors } } = useForm<HorariosInsertType>({
        resolver: zodResolver(CreateHorarioSchema),
        mode: 'onBlur',
        defaultValues: {
            claseId: horarioClase.claseId?? claseId,
            dayOfWeek: horarioClase.dayOfWeek?? 'lunes',
            startTime: horarioClase.startTime?? '07:00',
            endTime: horarioClase.endTime?? '08:00'
        }
    });

    
    const handleCreatehorario = async(input: HorariosInsertType)=> {
        console.log("Datos del formulario enviados:", input);
        if(horarioClase.id) {
            //si existe un horario Editamos
            const { success, message } = await editHorarioClaseAction({
                id: horarioClase.id,
                dayOfWeek: input.dayOfWeek,
                startTime: input.startTime,
                endTime: input.endTime,
                claseId: input.claseId
            })
            if(!success) {
                toast.error(message);
            }
            if(success) {
                toast.success(message);
                reset();
                closeModal();
                redirect(`/dashboard/clases/${slug}` as Route);
            }

        }
        if(!horarioClase.id) {
            const { success, message } = await createHorarioClaseAction(input)
            if(!success) { 
                toast.error(message); 
            }
            if(success){
                toast.success(message);
                reset();
                closeModal();
                redirect(`/dashboard/clases/${slug}` as Route);
            }
        }
    }

    const onError = (errors: any) => {
        console.log("Errores de validación en RHF:", errors);
        toast.error("Revisa los campos del formulario");
    };

  return (
    <Form 
        className="flex flex-col"
        onSubmit={handleSubmit(handleCreatehorario, onError)}
    >
        <FormLabel htmlFor="dayOfWeek">Día</FormLabel>
        <select {...register('dayOfWeek')} id="dayOfWeek" className="py-3 px-4 border border-gray-300 rounded-lg">
            <option value="">--Selecciona un día--</option>
            {   days.length > 0 && days.map((days)=> (
                <option key={days.value} value={days.value}>{days.label}</option>
            ))}
        </select>
        {errors.dayOfWeek && <FormError>{errors.dayOfWeek.message}</FormError>}

        <FormLabel htmlFor="startTime">Hora de inicio</FormLabel>
        <FormInput {...register('startTime')} id="startTime" type="time"/>
        {errors.startTime && <FormError>{errors.startTime.message}</FormError>}

        <FormLabel htmlFor="endTime">Hora de fin</FormLabel>
        <FormInput {...register('endTime')} id="endTime" type="time"/>
        {errors.endTime && <FormError>{errors.endTime.message}</FormError>}

        <FormSubmit>
            <IconCheck />
            <span>{horarioClase.id ? 'Editar horario': 'Crear Horario'}</span>
        </FormSubmit>
    </Form>
  )
}
