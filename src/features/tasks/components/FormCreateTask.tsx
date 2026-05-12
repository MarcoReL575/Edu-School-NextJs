import { Form, FormInput, FormLabel } from "@/src/shared/components/form";

export default function FormCreateTask() {
  return (
    <Form>
        <FormLabel>Título de Tarea</FormLabel>
        <FormInput type="text" />

        <FormLabel>Descripcion de Tarea</FormLabel>
        <FormInput type="text" />

        <FormLabel>Fecha de Entrega</FormLabel>
        <FormInput type="text" />

    </Form>
  )
}
