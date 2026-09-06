import { usersService } from "@/src/features/clases/services/UsersService";
import HomePageTeacher from "@/src/features/home/components/HomePageTeacher";
import HomePageTutor from "@/src/features/home/components/HomePageTutor";
import HomePageStudents from "@/src/features/students/components/HomePageStudents";
import { requireAuth } from "@/src/lib/auth-server"
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Edu-School: Inicio'
};


export default async function HomePage() {

  const { session } = await requireAuth();
  if(!session.user) redirect('/auth/signin');

  if(session.user.role === 'estudiante') return <HomePageStudents />;
  if(session.user.role === 'maestro') return <HomePageTeacher />;
  if(session.user.role === 'tutor') return <HomePageTutor session={session} />;
}
