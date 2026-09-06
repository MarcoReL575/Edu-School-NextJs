import PageStudentsAttendance from '@/src/features/attendance/components/PageStudentsAttendance';
import AttendanceTutorSection from '@/src/features/attendance/components/AttendanceTutorSection';
import MisClasesTechaerPage from '@/src/features/teachers/components/MisClasesTechaerPage';
import { requireAuth } from '@/src/lib/auth-server';
import Heading from '@/src/shared/components/typography/Heading'
import { redirect } from 'next/navigation';

export default async function AttendancePage() {
  const { session } = await requireAuth();   
  if(!session.user) redirect('/auth/signin');
  const rol = session.user.role
  
  return (
    <>
      { rol === 'maestro' && <MisClasesTechaerPage session={session} /> }
      { rol === 'estudiante' && <PageStudentsAttendance /> }
      { rol === 'tutor' && <AttendanceTutorSection /> }
    </>
  )
}
