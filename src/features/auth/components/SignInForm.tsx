'use client'

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLogin2 } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { SignInProps } from "../types/auth-types";
import { SignInSchema } from "../schemas/auth-schemas";
import { SignInAction } from "../actions/AuthActions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function SignInForm() {

  const { register, handleSubmit, formState: { errors } } = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
  })

  const handleSignIn = async(input: SignInProps)=> {
    const { success, message } = await SignInAction(input);
    if(!success)  { 
      toast.error(message);
    }
    if(success){
      toast.success(message);
      redirect('/dashboard/home');
    }
  }

  return (
    <Form 
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col border-2 p-10 rounded-lg "
    >
      <FormLabel htmlFor="name">Correo</FormLabel>
      <FormInput {...register('email')} id="name" type="email" placeholder="correo@correo.com" />
      {errors.email && <FormError>{errors.email.message}</FormError>}

      <FormLabel htmlFor="name">Contraseña</FormLabel>
      <FormInput {...register('password')} id="name" type="password" placeholder="Ingresa tu password" />
      {errors.password && <FormError>{errors.password.message}</FormError>}

      <FormSubmit>
        <IconLogin2 />
        Iniciar Sesión
      </FormSubmit>
    </Form>
  )
}