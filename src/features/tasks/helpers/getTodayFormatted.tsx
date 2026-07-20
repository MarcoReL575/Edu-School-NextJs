import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Asegúrate de tener instalado date-fns

export const getTodayFormatted = (date: Date) => {
  const now = date;
  
  // 1. Obtenemos el nombre del día (ej: "viernes")
  const dayName = format(now, 'EEEE', { locale: es });
  
  // 2. Obtenemos la hora (ej: "10:31")
  const time = format(now, 'HH:mm');
    
  return `${dayName} ${time}`;
};
