export function getCorrectDate(date: Date) {
    const fecha = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric' 
    })

    return fecha
}