export function getColorBySubject(subject: string) {
  const colors: Record<string, string> = {
    "Matemáticas": "bg-blue-100 border-l-4 border-blue-400",
    "Español": "bg-yellow-100 border-l-4 border-yellow-400",
    "Ciencias Naturales": "bg-green-100 border-l-4 border-green-400",
    "Inglés": "bg-purple-100 border-l-4 border-purple-400",
    "Educación Física": "bg-pink-100 border-l-4 border-pink-400",
    "Historia Universal": "bg-orange-100 border-l-4 border-orange-400",
    "Default": "bg-gray-100 border-l-4 border-gray-400"
  };
  return colors[subject] || colors["Default"];
}