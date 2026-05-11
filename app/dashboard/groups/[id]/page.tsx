import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ClassPage({ params }: Props) {

    const paramsId = (await params).id
    console.log(paramsId);

  return (
    <div>
        
    </div>
  )
}
