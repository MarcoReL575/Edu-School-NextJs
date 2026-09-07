"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { IconLock, IconMail, IconPlus, IconUser, IconX } from "@tabler/icons-react"
import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/form"
import { Button } from "@/src/shared/components/ui/button"
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/src/shared/components/ui/sheet"
import { UpdateProfileProps, UpdateProfileSchema, ChildMatriculaProps, ChildMatriculaSchema } from "../schemas/settings-schemas"
import { addChildMatriculaAction, updateChildMatriculaAction, updateProfileAction } from "../actions/settingsActions"
import { ProfileInfo, TutorChild } from "../types/types"

type Props = {
    profile: ProfileInfo
    children: TutorChild[]
    onSuccess: () => void
}

export function EditProfileForm({ profile, children, onSuccess }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateProfileProps>({
        resolver: zodResolver(UpdateProfileSchema),
        mode: "onBlur",
        defaultValues: {
            name: profile.name,
            lastName: profile.lastName,
            email: profile.email,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    })

    const handleUpdateProfile = async (data: UpdateProfileProps) => {
        const { success, message } = await updateProfileAction(data)
        if (!success) {
            toast.error(message)
            return
        }
        toast.success(message)
        onSuccess()
    }

    return (
        <SheetContent className="w-full max-w-md gap-0 overflow-y-auto sm:max-w-md">
            <SheetHeader>
                <SheetTitle>Editar mi perfil</SheetTitle>
                <SheetDescription>Actualiza tu información personal</SheetDescription>
            </SheetHeader>

            <Form className="mt-0 max-w-full space-y-4 px-4" onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="flex flex-col">
                    <FormLabel htmlFor="name" className="flex gap-x-2"><IconUser size={18} /> Nombre(s)</FormLabel>
                    <FormInput {...register("name")} id="name" type="text" />
                    {errors.name && <FormError>{errors.name.message}</FormError>}
                </div>

                <div className="flex flex-col">
                    <FormLabel htmlFor="lastName" className="flex gap-x-2"><IconUser size={18} /> Apellido(s)</FormLabel>
                    <FormInput {...register("lastName")} id="lastName" type="text" />
                    {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
                </div>

                <div className="flex flex-col">
                    <FormLabel htmlFor="email" className="flex gap-x-2"><IconMail size={18} /> Correo electrónico</FormLabel>
                    <FormInput {...register("email")} id="email" type="email" />
                    {errors.email && <FormError>{errors.email.message}</FormError>}
                </div>

                <div className="border-t pt-4">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">Cambiar contraseña (opcional)</p>

                    <div className="flex flex-col">
                        <FormLabel htmlFor="currentPassword" className="flex gap-x-2"><IconLock size={18} /> Contraseña actual</FormLabel>
                        <FormInput {...register("currentPassword")} id="currentPassword" type="password" />
                        {errors.currentPassword && <FormError>{errors.currentPassword.message}</FormError>}
                    </div>

                    <div className="mt-3 flex flex-col">
                        <FormLabel htmlFor="newPassword" className="flex gap-x-2"><IconLock size={18} /> Nueva contraseña</FormLabel>
                        <FormInput {...register("newPassword")} id="newPassword" type="password" />
                        {errors.newPassword && <FormError>{errors.newPassword.message}</FormError>}
                    </div>

                    <div className="mt-3 flex flex-col">
                        <FormLabel htmlFor="confirmNewPassword" className="flex gap-x-2"><IconLock size={18} /> Confirmar nueva contraseña</FormLabel>
                        <FormInput {...register("confirmNewPassword")} id="confirmNewPassword" type="password" />
                        {errors.confirmNewPassword && <FormError>{errors.confirmNewPassword.message}</FormError>}
                    </div>
                </div>

                {profile.role === "tutor" && (
                    <ChildrenMatriculaSection children={children} />
                )}

                <FormSubmit disabled={isSubmitting}>
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </FormSubmit>
            </Form>

            <SheetFooter>
                <SheetClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}

function ChildrenMatriculaSection({ children }: { children: TutorChild[] }) {
    const [addingChild, setAddingChild] = useState(false)

    return (
        <div className="border-t pt-4">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Matrícula de mis hijos</p>

            <div className="space-y-3">
                {children.map((child) => (
                    <ChildMatriculaRow key={child.id} child={child} />
                ))}
            </div>

            {addingChild ? (
                <AddChildForm onDone={() => setAddingChild(false)} />
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setAddingChild(true)}
                >
                    <IconPlus size={16} /> Agregar hijo
                </Button>
            )}
        </div>
    )
}

function ChildMatriculaRow({ child }: { child: TutorChild }) {
    const [editing, setEditing] = useState(false)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ChildMatriculaProps>({
        resolver: zodResolver(ChildMatriculaSchema),
        defaultValues: { matricula: child.matricula },
    })

    const handleEditMatricula = async (data: ChildMatriculaProps) => {
        const { success, message } = await updateChildMatriculaAction(child.id, data)
        if (!success) {
            toast.error(message)
            return
        }
        toast.success(message)
        setEditing(false)
    }

    if (!editing) {
        return (
            <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                    <p className="text-sm font-medium">{child.name} {child.lastName}</p>
                    <p className="text-xs text-muted-foreground">Matrícula: {child.matricula}</p>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(true)}>
                    Editar
                </Button>
            </div>
        )
    }

    return (
        <div className="rounded-lg border border-border p-3">
            <p className="mb-2 text-sm font-medium">{child.name} {child.lastName}</p>
            <div className="flex items-start gap-2">
                <div className="flex-1">
                    <FormInput {...register("matricula")} type="text" placeholder="Nueva matrícula" />
                    {errors.matricula && <FormError>{errors.matricula.message}</FormError>}
                </div>
                <Button type="button" size="sm" disabled={isSubmitting} onClick={handleSubmit(handleEditMatricula)}>
                    Guardar
                </Button>
                <Button type="button" variant="ghost" size="icon-sm" onClick={() => setEditing(false)}>
                    <IconX size={16} />
                </Button>
            </div>
        </div>
    )
}

function AddChildForm({ onDone }: { onDone: () => void }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ChildMatriculaProps>({
        resolver: zodResolver(ChildMatriculaSchema),
        defaultValues: { matricula: "" },
    })

    const handleAddChild = async (data: ChildMatriculaProps) => {
        const { success, message } = await addChildMatriculaAction(data)
        if (!success) {
            toast.error(message)
            return
        }
        toast.success(message)
        reset()
        onDone()
    }

    return (
        <div className="mt-3 rounded-lg border border-border p-3">
            <div className="flex items-start gap-2">
                <div className="flex-1">
                    <FormInput {...register("matricula")} type="text" placeholder="Matrícula del hijo(a)" />
                    {errors.matricula && <FormError>{errors.matricula.message}</FormError>}
                </div>
                <Button type="button" size="sm" disabled={isSubmitting} onClick={handleSubmit(handleAddChild)}>
                    Agregar
                </Button>
                <Button type="button" variant="ghost" size="icon-sm" onClick={onDone}>
                    <IconX size={16} />
                </Button>
            </div>
        </div>
    )
}
