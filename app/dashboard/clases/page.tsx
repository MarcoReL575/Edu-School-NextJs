import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import TableClases from '@/src/features/clases/components/TableClases';
import { requireAuth } from '@/src/lib/auth-server';
import Heading from '@/src/shared/components/typography/Heading';
import { getAllClasesAction } from '@/src/features/clases/actions/clasesAction';

export const metadata: Metadata = {
  title: 'Edu-School: Clases'
};

export default async function ClasesPage() {
  const { session } = await requireAuth();
  if(session?.user.role !== 'admin') redirect('/auth/signin');

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['listClases'],
    queryFn: ()=> getAllClasesAction()
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Heading level={1}>Pagina de Clases</Heading>
      <TableClases link='clases' />
    </HydrationBoundary>
  )
}
