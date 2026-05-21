export function getCorrectDate(date: Date) {
    if(!date) return
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric' 
    })
}