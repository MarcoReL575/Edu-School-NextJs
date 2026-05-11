import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Table } from "@tanstack/react-table";

type Props<TData> = {
    table: Table<TData>
}

export default function TablePagination<TData>({table}: Props<TData>) {
    return (
        <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
                <span className=" font-semibold text-gray-500">Filas por página:</span>
                <select
                    className="border border-gray-400 rounded p-1"
                    value={table.getState().pagination.pageSize}
                    onChange={e => table.setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 20, 50].map((size) => (
                        <option key={size} value={size.toString()}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2 ">
                <span className="text-gray-500 font-semibold">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </span>
                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <IconChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <IconChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
