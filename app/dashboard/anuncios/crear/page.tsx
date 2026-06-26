import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import FormCreateAnuncio from "@/src/features/anuncios/components/FormCreateAnuncio";
import Heading from "@/src/shared/components/typography/Heading";
import { Button } from "@/src/shared/components/ui/button";

export default function CrearAnuncioPage() {
  return (
    <>
        <section>
            <div className="flex items-center gap-x-4">
                <Link href={'/dashboard/anuncios'}>
                    <Button variant={'outline'} className="gap-x-2 items-center">
                        <span><IconArrowLeft /></span>
                        <span>Regresar</span>
                    </Button>
                </Link>
                <div>
                    <Heading level={2}>Crea un nuevo anuncio para toda la escuela</Heading>
                </div>
            </div>
            <FormCreateAnuncio />
        </section>  
    </>
  )
}
