import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Metadata } from 'next';
import TableGroups from '@/src/features/group/components/TableGroups'
import { getAllGroupsAction } from '@/src/features/group/actions/groupActions';

export const metadata: Metadata = {
  title: 'Edu-School: Grupos'
}
 

export default async function GroupPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['groupList'],
    queryFn: getAllGroupsAction
  })

  return (
    <section className='w-full'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TableGroups />
      </HydrationBoundary>
    </section>
  )
}
