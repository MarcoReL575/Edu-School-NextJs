export function formatTime(dateInput: Date | string): string {
    const date = new Date(dateInput);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    // Determinamos si es AM o PM
    const ampm = hours >= 12 ? 'pm' : 'am';
    
    // Convertimos de formato 24h a 12h
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'

    return `${hours}:${minutes} ${ampm}`;
}