import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import toast from "react-hot-toast";
import { IconCircleCheck, IconLock, IconMail, IconUser } from "@tabler/icons-react";
import { AlertCircle } from "lucide-react";
import ContinueButton from "./ContinueButton";
import RoleRegisterHeading from "./RoleRegisterHeading";
import { useStepsForm } from "../store/stepsFormStore";
import { SignUpProps } from "../types/auth-types";
import { SignUpSchema } from "../schemas/auth-schemas";
import { Form, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form/index'
import { createAccountAction, SignUpAction } from "../actions/AuthActions";

export default function SignUpForm() {

    const { role, setStep } = useStepsForm();
    const { register, reset, handleSubmit, formState: { errors } } = useForm<SignUpProps>({
        resolver: zodResolver(SignUpSchema),
        mode: 'onBlur',
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            roleId: '',
            role: role
        }
    })

    const handleCreateAccount = async(data: SignUpProps)=> {
        const { success, message } = await createAccountAction(data);
    
        if(!success) {
            toast.error(message)
        }
        if(success) {
            toast.success(message);
            setStep(3);
            redirect('/dashboard')
        }
    }

  return (
    <Form 
        className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4"
        onSubmit={handleSubmit(handleCreateAccount)}
    >
        <RoleRegisterHeading />
        
        <div className="flex flex-col w-full">
            <FormLabel htmlFor="name" className="flex gap-x-2"><IconUser />Nombre(s) </FormLabel>
            <FormInput {...register('name')} id="name" type="text" placeholder="Juan Carlos" />
            {errors.name && <FormError>{errors.name.message}</FormError>}
        </div>
        <div className="flex flex-col">
            <FormLabel htmlFor="lastname" className="flex gap-x-2"><IconUser />Apellidos </FormLabel>
            <FormInput {...register('lastname')} id="lastname" type="text" placeholder="Ramírez López" />
            {errors.lastname && <FormError>{errors.lastname.message}</FormError>}
        </div>
        <div className="flex flex-col">
            <FormLabel htmlFor="email" className="flex gap-x-2 w-full"><IconMail />Correo electrónico </FormLabel>
            <FormInput {...register('email')} id="email" type="email" placeholder="correo@eduSchool.com" className="w-full" />
            {errors.email && <FormError>{errors.email.message}</FormError>}
        </div>
        {/* <div className="flex flex-col">
            <FormLabel htmlFor="role" className="flex gap-x-2 w-full">Rol del usuario </FormLabel>
            <FormInput id="role" type="" placeholder="correo@eduSchool.com" className="w-full" />
            {errors.email && <FormError>{errors.email.message}</FormError>}
        </div> */}
        <div className="flex flex-col">
            <FormLabel htmlFor="password" className="flex gap-x-2"><IconLock />Contraseña </FormLabel>
            <FormInput {...register('password')} id="password" type="password" />
            {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>
        <div className="flex flex-col">
            <FormLabel htmlFor="confirmPassword" className="flex gap-x-2"><IconLock /> Confirmar Contraseña </FormLabel>
            <FormInput {...register('confirmPassword')} id="confirmPassword" type="password"/>
            {errors.confirmPassword && <FormError>{errors.confirmPassword.message}</FormError>}
        </div>
        <div className="flex flex-col">
            <FormLabel htmlFor="schoolId">
                {role === 'estudiante' && 'Matrícula / ID Escolar' }
                {role === 'maestro' && 'Clave Docenter' }
                {role === 'tutor' && 'Matrícula(s) del/los alumno(s)' }
                {role === 'admin' && 'Código de Acceso Administrativo' }
            </FormLabel>
            <FormInput {...register('roleId')} id="schoolId" type="text" placeholder={role === 'tutor' ? 'Ej. ABC123, DEF456' : undefined} />
            {role === 'tutor' && <span className="text-sm text-gray-500">Si tienes más de un hijo, separa las matrículas con comas</span>}
            {role === 'admin' && <span className="flex items-center gap-x-2 text-sm text-yellow-600 font-semibold"><AlertCircle /> Este código es proporcionado por la Institución</span> }
            {errors.roleId && <FormError>{errors.roleId.message}</FormError>}
        </div>
        <div>
            <ContinueButton />
        </div>
        <div>
            <FormSubmit>
                <span>Crear Cuenta</span>  
                <IconCircleCheck />
            </FormSubmit>
        </div>
    </Form>
  )
}