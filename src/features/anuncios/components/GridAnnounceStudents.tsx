import React from 'react'
import { AnunciosSelect } from '../types/types'
import CardAnnounce from './CardAnnounce'

type Props = {
    announce: AnunciosSelect[]
}

export default function GridAnnounceStudents({ announce }: Props) {
  return (
    <section className='flex flex-col space-y-10'>
        {announce.map((announce)=> (
            <CardAnnounce key={announce.id} announce={announce} />
        ))}
    </section>
  )
}
