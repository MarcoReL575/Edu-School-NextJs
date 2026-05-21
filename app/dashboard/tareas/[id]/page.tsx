import { taskStudentAction } from '@/src/features/tasks/actions/tasksAction';
import TableSubmitTasksStudent from '@/src/features/tasks/components/TableSubmitTasksStudent';
import { taskService } from '@/src/features/tasks/services/taskService';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PageTaskInformation({ params }: Props) {

  const taskId = (await params).id;
  const { success, message, groupId } = await taskService.getGroupIdByTaskId(Number(taskId));


  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tasks'],
    queryFn: ()=> taskStudentAction(groupId, +taskId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient )}>
      <TableSubmitTasksStudent groupId={groupId} taskId={+taskId} />
    </HydrationBoundary>
  )
}
