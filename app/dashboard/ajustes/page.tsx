import { redirect } from "next/navigation"
import { requireAuth } from "@/src/lib/auth-server"
import { getMyProfileAction, getTutorChildrenForSettingsAction } from "@/src/features/settings/actions/settingsActions"
import { MiPerfilSection } from "@/src/features/settings/components/MiPerfilSection"

export default async function SettingsPage() {
    const { isAuth } = await requireAuth()
    if (!isAuth) redirect("/auth/signin")

    const [profile, children] = await Promise.all([
        getMyProfileAction(),
        getTutorChildrenForSettingsAction(),
    ])

    if (!profile) redirect("/auth/signin")

    return (
        <div className="container mx-auto max-w-4xl space-y-6 py-6">
            <MiPerfilSection profile={profile} children={children} />
        </div>
    )
}
