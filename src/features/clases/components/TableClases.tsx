'use client'

import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Route } from "next";
import Link from "next/link";
import { IconArrowsUpDown, IconCirclePlus} from "@tabler/icons-react";
import { getAllClasesAction } from "../actions/clasesAction";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { Button } from "@/src/shared/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card";
import TableComponent from "@/src/shared/components/table/Table";
import { ClasesInfoComplete } from "../types/types";

type Props = {
    link: string;
}

export default function TableClases({ link }: Props) {
    const openModal = useModalStore((state)=> state.openModal);

    const {data: listClases, isLoading, isError} = useQuery({
        queryKey: ['listClases'],
        queryFn: ()=> getAllClasesAction()
    })

    const columns = useMemo<ColumnDef<ClasesInfoComplete>[]>(() => [
        {
            accessorKey: 'subject',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Materia <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("subject")}</div>
        },
        {
            accessorKey: 'grado',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Grado <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("grado")}</div>,
        },
        {
            accessorKey: 'group',
            header: () => <span>Grupo</span>,
            cell: ({ row }) => <div className="font-medium">{row.getValue("group")}</div>,
        },
        {
            accessorKey: 'level',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nivel Académico <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("level")}</div>,
        },
        {
            accessorKey: 'teacher',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Maestro <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("teacher")}</div>,
        },
        {
            accessorKey: 'id',
            header: () => <Button variant="ghost">Ver/Agregar horarios</Button>,
            cell: ({row}) => (
                <div className="flex items-center justify-center gap-x-2">
                    <Button><Link href={`/dashboard/${link}/${(row.original as any).id}` as Route}>Más info</Link></Button>
                </div>
            ) 
        },
    ], [], )


    if(isLoading ) return <div>Cargando lista de Clases...</div>;
    if(isError || listClases === undefined) return <div>Error al cargar la lista de alumnos</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Todas las Clases</CardTitle>
                <CardDescription>Crea y organiza todas las clases</CardDescription>
                <CardAction>
                    <Button onClick={()=> openModal('createClases')} className='flex space-x-2 hover:bg-black/60'>
                        <IconCirclePlus /> 
                        Crear Nueva Clase
                    </Button>
                </CardAction>
            </CardHeader>
            
            <TableComponent data={listClases} columns={columns} />
        </Card>
    )
}