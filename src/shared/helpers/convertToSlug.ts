export const convertToSlug = (text: string) => {
    return text
        .toLowerCase()
        .normalize('NFD') // Separa los acentos de las letras
        .replace(/[\u0300-\u036f]/g, '') // Remueve los acentos
        .replace(/[^a-z0-9\s-]/g, '') // Remueve caracteres especiales extraños
        .trim()
        .replace(/[\s_]+/g, '-') // Reemplaza espacios por guiones
        .replace(/-+/g, '-'); // Evita guiones dobles
}