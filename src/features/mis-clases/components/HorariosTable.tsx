import { HorariosSelectType } from '../../clases/types/types'

type Props = {
    horarios: HorariosSelectType[] | undefined
}

export default function HorariosTable({ horarios }: Props) {

    if(horarios === undefined) return <div>No se encontraron datos</div>;

    return (
        <div className='p-6'>
            <div className="flex flex-col gap-y-4 rounded-lg items-center w-full max-w-4xl justify-center py-4 border-2 border-gray-400">
                <p>Revisa tus horarios de la materia </p>
                {
                    horarios.length
                        ? horarios.map((horario) => (
                            <p key={horario.id} className="p-2 bg-white w-xs flex items-center justify-between rounded-lg border-2 border-gray-300">
                                <span className='capitalize'> {horario.dayOfWeek === 'miercoles' ? 'miércoles' : horario.dayOfWeek}</span> <span>{horario.startTime.slice(0,5)} hrs - {horario.endTime.slice(0,5)} hrs</span>
                            </p>
                        ))
                        : <p>Aún no hay horarios para esta clase</p>
                }
            </div>
        </div>
    )
}   
