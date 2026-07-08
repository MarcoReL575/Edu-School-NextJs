import GridAnnounceStudents from "@/src/features/anuncios/components/GridAnnounceStudents";
import { announceService } from "@/src/features/anuncios/services/anunciosServices";
import { requireAuth } from "@/src/lib/auth-server"
import { Button } from "@/src/shared/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AnunciosPage() {

    const { session } = await requireAuth();
    if(!session.user.role) redirect('/auth/signin');
    const role = session.user.role

    const { success, message, announces } = await announceService.selectAnnounces();
    const annonceStudents = announces.filter((announce)=> announce.targetType !== 'teachers');
    const annonceTeachers = announces.filter((announce)=> announce.targetType !== 'students');
    console.log({annonceStudents, annonceTeachers});

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
        { role === 'estudiante' && <GridAnnounceStudents announce={annonceStudents} /> }
        { role === 'maestro' && <GridAnnounceStudents announce={annonceTeachers} /> }
        { role === 'admin' && <GridAnnounceStudents announce={announces} /> }
    </>
  )
}
