'use client'

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import { ArrowUpDown } from "lucide-react"
import { getAllGroupsAction } from "../actions/groupActions"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Button } from "@/src/shared/components/ui/button"
import TableComponent from "@/src/shared/components/table/Table"
import { MenuOptions } from "./MenuOptions"
import { GroupSelectType } from "../types/types"
import { IconCirclePlusMinus } from "@tabler/icons-react"
import { useModalStore } from "@/src/shared/store/useModalStore"
import { useGroupStore } from "../store/useGroupStore"

export default function TableGroups() {
    const openModal = useModalStore((state)=> state.openModal)
    const setGroup = useGroupStore((state)=> state.setGroup)

    const { data: listGroups, isLoading, isError } = useQuery({
        queryKey: ['groupList'],
        queryFn: getAllGroupsAction
    })

    const handleOpenModal = ()=> {
        setGroup({} as GroupSelectType);
        openModal('createGroup')
    }

    const columns = useMemo<ColumnDef<GroupSelectType>[]>(() => [
        {
            accessorKey: 'grade',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Grade <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("grade")}</div>,
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
                    Grado Academico <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("level")}</div>,
        },
        {
            accessorKey: 'id',
            header: () => <span>Acciones</span>,
            cell: ({ row }) => <MenuOptions  group={row.original}/>
        },
    ], [], );

    if(isLoading) return <div>Cargando la tabla de los grupos...</div>;
    if(isError || listGroups === undefined) return <div>Error al cargar los datos</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de Grupos</CardTitle>
                <CardDescription className="text-gray-400">Ve la información completa de cada grupo. Crea y organiza todos los grupos</CardDescription>
                <CardAction>
                    <Button onClick={handleOpenModal} className='flex space-x-2 hover:bg-black/60'>
                        <IconCirclePlusMinus/> 
                        Crear Nuevo Grupo
                    </Button>
                </CardAction>
            </CardHeader>
            
            <TableComponent data={listGroups} columns={columns}  />
        </Card>
    )
}