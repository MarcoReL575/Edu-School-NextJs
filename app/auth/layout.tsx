import WallpaperSignUp from "@/src/features/auth/components/WallpaperSignUp"
import { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <section className='grid grid-cols-1 lg:grid-cols-3 h-dvh p-2 md:px-10 py-10 gap-x-10 justify-center '>
            <div className=' hidden max-w-xl lg:flex lg:flex-col items-center justify-center space-y-20'>
                <WallpaperSignUp />
            </div>

            <div className='hidden max-w-3xl lg:flex lg:flex-col items-center justify-center space-y-20 col-span-2'>
                {children}
            </div>
        </section>
    )
}