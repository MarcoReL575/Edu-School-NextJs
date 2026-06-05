import MisClasesTechaerPage from '@/src/features/teachers/components/MisClasesTechaerPage';
import { requireAuth } from '@/src/lib/auth-server';
import Heading from '@/src/shared/components/typography/Heading'

export default async function AttendancePage() {
  const { session } = await requireAuth();    

  return (
    <>
      <Heading level={2}>Selecciona una de tus clases para pasar lista</Heading>
      <MisClasesTechaerPage session={session} />
    </>
  )
}
