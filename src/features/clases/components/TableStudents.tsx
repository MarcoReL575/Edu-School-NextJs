'use client'

import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { IconCirclePlus, IconArrowsUpDown } from "@tabler/icons-react"
import { Route } from "next"
import Link from "next/link"
import { getListStudentsAction } from "../actions/studentsActions"
import { useGroupStore } from "../store/useGroupStore"
import { Button } from "@/src/shared/components/ui/button"
import TableComponent from "@/src/shared/components/table/Table"
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/src/shared/components/ui/card"
import { useModalStore } from "@/src/shared/store/useModalStore"
import { MenuOptions } from "./MenuOptions"
import { GroupSelectType, StudentsTable } from "../types/types"

export default function TableStudents() {
    const openModal = useModalStore((state)=> state.openModal);
    const setGroup = useGroupStore((state)=> state.setGroup);

    const {data: listStudents, isLoading, isError } = useQuery({
        queryKey: ['studentsList'],
        queryFn: getListStudentsAction
    });

    const handleCreateStudent = ()=> {
        setGroup({} as GroupSelectType)
        openModal('createStudent');
    }

    const columns = useMemo<ColumnDef<StudentsTable>[]>(() => [
        {
            accessorKey: 'last_name',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    <span>Nombre Completo del Alumno </span>
                    <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <Link 
                    className="font-medium flex items-center justify-start hover:underline transition-all duration-200 ease-in"
                    href={`/dashboard/students/${row.original.id}` as Route}
                >
                    {row.getValue("last_name")} {row.getValue("name")}
                </Link>
            ),
        },
        {
            accessorKey: 'grade',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Grado <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium flex gap-x-2 items-center justify-center">{row.getValue("grade")}</div>
        },
        {
            accessorKey: 'group',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Grupo <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
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
            accessorKey: 'matricula',
            header: () => <span>Matrícula</span>,
            cell: ({ row }) => <div className="font-sm flex gap-x-2 items-center justify-center">{row.getValue("matricula")}</div>
        },
        {
            accessorKey: 'inscrito',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Inscrito <IconArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue("inscrito") === true && 'inscrito'}</div>,
        },
        {
            accessorKey: 'name',
            header: () => <span>Opciones</span>,
            cell: ({row})=> <div><MenuOptions student={row.original} /></div>
        },
    ], [], )

    if(isLoading) return <div>Cargando lista de Alumnos...</div>
    if(isError || listStudents === undefined) return <div>Error al caragr la tabla</div>
  return (
    <Card>
        <CardHeader>
            <CardTitle>Lista de Estudiantes</CardTitle>
            <CardDescription>Aqú pidrás administrar a todos los estudiantes. Crea un nuevo estudiante y asignale algún grupo</CardDescription>
            <CardAction>
                <Button onClick={handleCreateStudent} className='flex space-x-2 hover:bg-black/60'>
                    <IconCirclePlus /> 
                    Crear nuevo Estudiante
                </Button>
            </CardAction>
        </CardHeader>
        
        <TableComponent data={listStudents} columns={columns} />
    </Card>
  )
}