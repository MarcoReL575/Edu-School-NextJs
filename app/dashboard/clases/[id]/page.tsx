import InfoClase from '@/src/features/clases/components/InfoClase'
import { clasesServices } from '@/src/features/clases/services/ClasesServices'
import { IconArrowLeft, IconChevronLeft } from '@tabler/icons-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ClassPage({ params }: Props) {
  const claseId = (await params).id
  const infoClases = await clasesServices.claseById(claseId);
  const horariosClase = await clasesServices.getHorarios(claseId);

  return (
    <>
      <div className=''>
        <Link href={'/dashboard/clases'} className='flex items-center justify-center gap-x-2 rounded-lg bg-black hover:bg-black/60 text-white cursor-pointer px-2 py-1 w-fit font-semibold'>
          <IconArrowLeft />
          Regresar
        </Link>
      </div>
      <InfoClase clase={infoClases} horarios={horariosClase} />
    </>
  )
}
