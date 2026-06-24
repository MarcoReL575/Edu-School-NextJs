'use client'

import { useState } from 'react';
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, SortingState, useReactTable } from '@tanstack/react-table'
import { CardContent, CardFooter } from '../ui/card';
import { TableHead, Table, TableBody, TableRow, TableCell, TableHeader } from '../ui/table';
import TablePagination from './TablePagination';

type TableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData, any>[] // Usamos TData aquí
    nameTable?: string;
}

export default function TableComponent<TData>({ data, columns, nameTable}: TableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data: data ?? [],
        columns,
        state: {
            sorting,
            columnFilters,
            pagination
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <CardContent >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className='text-center'>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) =>(
                                    <TableCell key={cell.id} className='text-center'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
            { nameTable !== 'horario' && (
                <CardFooter>
                    <TablePagination table={table} />
                </CardFooter>
            )}
        </>
    )
}