'use client'

import React, { useMemo } from 'react'
import { IconArrowsUpDown, IconCirclePlus, IconPencil, IconTrash } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from '@/src/shared/components/ui/card'
import { Button } from '@/src/shared/components/ui/button'
import TableComponent from '@/src/shared/components/table/Table'
import { TeachersSelectType } from '../types/types'
import { useQuery } from '@tanstack/react-query'
import { getTeachersListAction } from '../actions/teachersActions'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/src/shared/components/ui/tooltip'
import { Route } from 'next'

type Props = {
    userId: string
}

export default function TableTeachersList({ userId }: Props) {

    const { data, isLoading, error } = useQuery({
        queryKey: ['teachersList', userId],
        queryFn: getTeachersListAction,
        // Opcional: configurar cuánto tiempo se consideran frescos los datos en caché (ej. 5 minutos)
        staleTime: 1000 * 60 * 5,
    })

    if (data === undefined || error) return <div>No se encontraron datos</div>

    const columns = useMemo<ColumnDef<TeachersSelectType>[]>(() => [
        {
            accessorKey: 'lastName',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Apellidos</span>
                    <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("lastName")}</div>
        },
        {
            accessorKey: 'name',
            header: () => <span>Nombre</span>,
            cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("name")}</div>
        },
        {
            accessorKey: 'level',
            header: () => <span>Nivel Académico</span>,
            cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("level")}</div>
        },
        {
            accessorKey: 'slug',
            header: () => <span>Más opciones</span>,
            cell: ({ row }) => {
                const name = row.getValue("slug");
                return (
                    <div className="font-sm flex gap-x-2 items-center justify-center">
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={`/dashboard/maestros/${name}` as Route} className='text-blue-500 hover:text-blue-400'><IconPencil /></Link> 
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Editar</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                            <span className='text-red-500 hover:text-red-400'><IconTrash /></span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Eliminar</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )
            }
        },
    ], [],);

    return (
        <section className='p-4'>
            <TooltipProvider>
                <Card>
                    <CardHeader>
                        <CardTitle>Lista de Maestros</CardTitle>
                        <CardDescription>Lista con la información de todos los maestros que estan dados de alta en tu escuela</CardDescription>
                        <CardAction>
                            <Link href={'/dashboard/maestros/agregar-maestro'}>
                                <Button ><IconCirclePlus /> Añadir Maestro</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <TableComponent data={data.teachers} columns={columns} nameTable='Lista de Maestros' />
                </Card>
            </TooltipProvider>
        </section>
    )
}
