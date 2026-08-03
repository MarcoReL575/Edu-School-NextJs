import InfoClase from '@/src/features/clases/components/InfoClase'
import { clasesServices } from '@/src/features/clases/services/ClasesServices'
import { IconArrowLeft, IconChevronLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ClassPage({ params }: Props) {
  const claseSlug = (await params).slug
  const { clase } = await clasesServices.claseBySlug(claseSlug);
  if(!clase || !clase.id) {
    notFound()
  }
  console.log(clase.id)
  
  const { horarios } = await clasesServices.getHorarios(clase.id);

  return (
    <>
      <div className=''>
        <Link href={'/dashboard/clases'} className='flex items-center justify-center gap-x-2 rounded-lg bg-black hover:bg-black/60 text-white cursor-pointer px-2 py-1 w-fit font-semibold'>
          <IconArrowLeft />
          Regresar
        </Link>
      </div>
      <InfoClase clase={clase} horarios={horarios} claseId={clase.id} />
    </>
  )
}