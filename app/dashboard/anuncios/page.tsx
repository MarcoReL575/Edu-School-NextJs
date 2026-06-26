import { requireAuth } from "@/src/lib/auth-server"
import { Button } from "@/src/shared/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AnunciosPage() {

    const { session } = await requireAuth();
    if(!session.user.role) redirect('/auth/signin');
    const role = session.user.role

  return (
    <>
        {role === 'admin' && 
            <section className="w-full flex items-center justify-end">
                <Link href={'/dashboard/anuncios/crear'}>
                    <Button className="flex items-center">
                        <span><PlusCircleIcon /></span>
                        <span>Publicar Anuncio</span>
                    </Button>
                </Link>
            </section>
        }
        <section>
            
        </section>
    </>
  )
}
