'use client'

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconCircleCheck } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Form, FormSubmit } from "@/src/shared/components/form";
import { ClasesInputType } from "../types/types";
import { CreateClasesSchema } from "../schema/clasesSchemas";
import SelectTeachers from "./SelectTeachers";
import SelectSubjects from "./SelectSubjects";
import SelectGroups from "./SelectGroups";
import { redirect } from "next/navigation";
import { createClassAction } from "../actions/clasesAction";


export default function FormCreateClases() {

  const methods = useForm<ClasesInputType>({
    resolver: zodResolver(CreateClasesSchema),
    defaultValues: {
      groupId: "",
      subjectId: "",
      teacherId: ""
    }
  });

  const handleCreateClass = async (data: ClasesInputType) => {
    const { success, message } = await createClassAction(data);
    if(!success) {
      toast.error(message);
    }
    if(success){
      toast.success(message);
      methods.reset();
      // setCloseModal();
      redirect('/dashboard/clases');
    }
  };

  return (
    <FormProvider {...methods}>
      <Form 
        className="flex flex-col max-w-xl" 
        onSubmit={methods.handleSubmit(handleCreateClass)}
      >
        <SelectSubjects />
        <SelectTeachers />
        <SelectGroups />

        <FormSubmit className="col-span-2">
          <IconCircleCheck />
          Crear Clase
        </FormSubmit>
      </Form>
    </FormProvider>
  )
}