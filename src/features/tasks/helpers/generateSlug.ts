export const generateSlug = (str: string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remueve acentos
        .replace(/[^a-z0-9 ]/g, "")   // Remueve caracteres especiales
        .trim()
        .replace(/\s+/g, "-");        // Reemplaza espacios por guiones
};