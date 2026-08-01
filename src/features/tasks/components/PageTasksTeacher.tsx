import { getTasksTeacherAction } from "../actions/tasksAction";
import GridTaskTeacher from "./GridTaskTeacher";

type Props = {
    teacherId: string
}

export default async function PageTasksTeacher({ teacherId }:Props) {

    const taskList = await getTasksTeacherAction(teacherId);
   
  return (
    <GridTaskTeacher taskList={taskList} />
  )
}