import { getTeachersListAction } from '@/src/features/teachers/actions/teachersActions'
import TableTeachersList from '@/src/features/teachers/components/TableTeachersList'
import { requireAuth } from '@/src/lib/auth-server'
import Heading from '@/src/shared/components/typography/Heading';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

export default async function PageMaestrosList() {
  const {session} = await requireAuth();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
      queryKey: ['teachersList',session.user.id],
      queryFn: getTeachersListAction
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <Heading level={2}>Administra aquí a tus maestros </Heading>
      </section>
      <TableTeachersList userId={session.user.id} />
    </HydrationBoundary>
  )
}

