import { z } from "zod";

export const announcementTargetSchema = z.enum(["all", "students", "teachers"], {
    message: "El tipo de audiencia seleccionado no es válido.",
});


// 2. Esquema principal para la inserción de anuncios
export const insertAnnouncementSchema = z.object({
    title: z
        .string({ message: "El título es obligatorio." })
        .min(3, "El título debe tener al menos 3 caracteres.")
        .max(100, "El título no puede exceder los 100 caracteres.")
        .trim(),
    
    content: z
        .string({ message: "El contenido del anuncio es obligatorio." })
        .min(10, "El contenido debe ser más descriptivo (mínimo 10 caracteres).")
        .max(2000, "El contenido no puede exceder los 2000 caracteres.")
        .trim(),
    
    targetType: announcementTargetSchema.default("all"),
});