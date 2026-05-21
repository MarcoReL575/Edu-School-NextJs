'use client'

import { useQuery } from "@tanstack/react-query"
import { taskStudentAction } from "../actions/tasksAction"

type Props = {
    groupId: string;
}

export default function TableSubmitTasksStudent({ groupId }: Props) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['tasks'],
        queryFn: ()=> taskStudentAction(groupId),
    });

    console.log(data)

  return (
    <div>

    </div>
  )
}
