import { DaysOfWeek } from "../../teachers/types/types";

export function getTodayDayName(): DaysOfWeek {
    const days = [
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
    ];
    return days[new Date().getDay()] as DaysOfWeek ;
}