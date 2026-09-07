"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { IconMail, IconPencil, IconUserCircle } from "@tabler/icons-react"
import { Avatar, AvatarFallback } from "@/src/shared/components/ui/avatar"
import { Button } from "@/src/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Sheet, SheetTrigger } from "@/src/shared/components/ui/sheet"
import Heading from "@/src/shared/components/typography/Heading"
import { EditProfileForm } from "./EditProfileForm"
import { ProfileInfo, TutorChild } from "../types/types"

const roleLabels: Record<string, string> = {
    admin: "Administrador",
    maestro: "Maestro",
    estudiante: "Estudiante",
    tutor: "Tutor",
}

type Props = {
    profile: ProfileInfo
    children: TutorChild[]
}

export function MiPerfilSection({ profile, children }: Props) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const initials = `${profile.name?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase() || <IconUserCircle />

    const handleSuccess = () => {
        setOpen(false)
        router.refresh()
    }

    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>
                    <Heading level={3}>Mi perfil</Heading>
                </CardTitle>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon-sm" aria-label="Editar perfil">
                            <IconPencil size={16} />
                        </Button>
                    </SheetTrigger>
                    <EditProfileForm profile={profile} children={children} onSuccess={handleSuccess} />
                </Sheet>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Avatar size="lg">
                    <AvatarFallback className="text-base font-semibold">{initials}</AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                    <p className="text-lg font-semibold capitalize">{profile.name} {profile.lastName}</p>
                    <p className="flex items-center gap-x-2 text-sm text-muted-foreground">
                        <IconMail size={16} /> {profile.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Rol: <span className="font-medium text-foreground">{roleLabels[profile.role] ?? profile.role}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
