import { notFound } from "next/navigation";
import Link from "next/link";
import { examService } from "@/src/features/examenes/services/examService";
import TableExamControlStudents from "@/src/features/examenes/components/TableExamControlStudents";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function TeacherExamControlPage({ params }: Props) {
    const { slug } = await params;
    const data = await examService.getExamControl(slug);

    if (!data || !data.success || !data.exam) {
        notFound();
    }
    const { exam, students } = data;
    const totalStudents = students.length;
    const completedSubmissions = students.filter((student) => student.examSubmissions[0]?.status === 'entregado').length;

    return (
        <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
            
            {/* Encabezado */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Panel de Examen</span>
                    <h1 className="text-3xl font-extrabold text-gray-900 mt-1 capitalize">Examen: {exam.title}</h1>
                </div>
                <Link 
                    href="/dashboard/examenes" 
                    className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                    ← Volver a Lista
                </Link>
            </div>

            {/* Tarjetas de Información */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Materia / Asignatura</p>
                    <p className="text-xl font-bold text-gray-800 capitalize mt-1">{exam.subjectName}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Progreso de Entrega</p>
                    <p className="text-2xl font-black text-blue-600 mt-1">
                        {completedSubmissions} / {totalStudents}{" "}
                        <span className="text-sm font-normal text-gray-400">alumnos evaluados</span>
                    </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-500 font-medium">Estado del Examen</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-2 ${
                        exam.status === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {exam.status === 'activo' ? '🔴 Activo' : '⚪ Inactivo'}
                    </span>
                </div>
            </div>

            {/* Tabla de Alumnos */}
            <TableExamControlStudents students={students} />
        </div>
    );
}