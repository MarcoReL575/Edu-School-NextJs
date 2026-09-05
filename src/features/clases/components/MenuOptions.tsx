import { Button } from "@/src/shared/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/src/shared/components/ui/dropdown-menu"
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react"
import { GroupSelectType } from "../../group/types/types";
import { StudentsTable } from "../../students/types/types";
import { useGroupStore } from "../../group/store/useGroupStore";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { useStudentStore } from "../../students/store/useStudentStore";
import { CreateStudent } from "../../students/schemas/studentsSchemas";

type Props = {
  group?: GroupSelectType;
  student?: StudentsTable;
}

export function MenuOptions({ group, student }: Props) {
  const setGroup = useGroupStore((state)=> state.setGroup);
  const openModal = useModalStore((state)=> state.openModal);
  const setStudent = useStudentStore((state)=> state.setStudent);

  let studentInfo = {} as CreateStudent;

  const setInfo = ()=> {
    if(group && group.id){
      setGroup(group);
      openModal('createGroup');
    }

    if(student && student.id){
      studentInfo = {
        id: student.id,
        name: student.name,
        lastName: student.last_name,
        nivelEstudios: student.level,
        inscrito: student.inscrito,
        groupId: student.group_id
      }
      setGroup({
        id: student.group_id,
        grade: student.grade,
        group: student.group,
        level: student.level
      })
      setStudent(studentInfo);
      openModal('createStudent');
    }
  }

  const deleteInfo = ()=> {
    if(group && group.id){
      setGroup(group);
      openModal('modalDeleteGroup');
    }  

    if(student && student.id){
      studentInfo = {
        id: student.id,
        name: student.name,
        lastName: student.last_name,
        nivelEstudios: student.level,
        inscrito: student.inscrito,
        groupId: student.group_id
      }
      setStudent(studentInfo);
      openModal('modalDeleteStudent');
    }
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="z-20">
        <Button variant="outline">
          <IconDots />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 z-20" align="end">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuItem 
          className=" pl-2 py-0.5 flex items-center gap-x-2 text-blue-600 hover:text-blue-400 hover:translate-x-4 transition-all duration-300 ease-in cursor-pointer"
          onSelect={(e)=>{
            setInfo();
          }}
        >
          <IconEdit size={20} />
          Editar 
        </DropdownMenuItem>
    
        <DropdownMenuItem 
          className=" pl-2 py-0.5 flex items-center gap-x-2 text-red-600 hover:text-red-400 hover:translate-x-4 transition-all duration-300 ease-in cursor-pointer"
          onSelect={(e)=> {
            deleteInfo()
          }}
        >
          <IconTrash size={20} />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
