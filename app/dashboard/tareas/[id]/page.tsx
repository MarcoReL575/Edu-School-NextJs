import { taskStudentAction } from '@/src/features/tasks/actions/tasksAction';
import CardStatsSubmittedTasks from '@/src/features/tasks/components/CardStatsSubmittedTasks';
import TableSubmitTasksStudent from '@/src/features/tasks/components/TableSubmitTasksStudent';
import { taskService } from '@/src/features/tasks/services/taskService';
import Heading from '@/src/shared/components/typography/Heading';
import { Button } from '@/src/shared/components/ui/button';
import { IconArrowLeft, IconClipboardCheck } from '@tabler/icons-react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>
}

export default async function PageTaskInformation({ params }: Props) {

  const taskId = (await params).id;
  const { success, message, groupId } = await taskService.getGroupIdByTaskId(Number(taskId));
  const taskInfo = await taskService.getTaskByTaskId(Number(taskId));

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['ListTasksGrade', +taskId],
    queryFn: ()=> taskStudentAction(groupId, +taskId),
  })

  return (
    <>
      <header className='flex gap-x-4 items-center '>
        <Link href="/dashboard/tareas" className='flex items-center gap-x-2'>
          <Button><IconArrowLeft className="h-4 w-4" />Volver a las tareas</Button>
        </Link>
      </header>
      <main className='flex flex-col space-y-10'>
        <section className='space-y-5'>
          <Heading level={1} className='text-gray-700 mt-4 text-center'>
            {taskInfo.data.subjectName}: {taskInfo.data.grade}{taskInfo.data.group} {taskInfo.data.level}
          </Heading>
          <Heading level={2}>Tarea: {taskInfo.data.title}</Heading>
          <p className='text-gray-400'>Descripción: {taskInfo.data.description}</p>
        </section>
        <HydrationBoundary state={dehydrate(queryClient )}>
          <TableSubmitTasksStudent groupId={groupId} taskId={+taskId} />
        </HydrationBoundary>
      </main>
    </>
  )
}
