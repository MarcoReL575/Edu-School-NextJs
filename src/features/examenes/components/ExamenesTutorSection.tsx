import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import { getTutorChildrenAction } from "@/src/features/parents/actions/parentsActions";
import StudentExamPage from "./StudentExamPage";
import Heading from "@/src/shared/components/typography/Heading";

export default async function ExamenesTutorSection() {
    const children = await getTutorChildrenAction();

    if (children.length === 0) {
        return <p className="text-center mt-5">Aún no tienes hijos(as) vinculados a tu cuenta.</p>
    }

    if (children.length === 1) {
        return <StudentExamPage userId={children[0].user_id} />
    }

    return (
        <>
            <section>
                <Heading level={1}>Exámenes Asignados</Heading>
                <p>
                    {children.length === 0 
                        ? 'Revisa los exámenes que se le han asignado a tu hijo'
                        : 'Revisa los exámenes que se le han asignado a tus hijos.'
                    }
                </p>
            </section>
            <Tabs defaultValue={children[0].id} className="flex flex-col">
                <TabsList variant="line" className="mx-auto border rounded-lg border-gray-600 bg-gray-100 p-2">
                    {children.map((child) => (
                        <TabsTrigger key={child.id} value={child.id}>
                            {child.name} {child.lastName}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {children.map((child) => (
                    <TabsContent key={child.id} value={child.id}>
                        <StudentExamPage userId={child.user_id} />
                    </TabsContent>
                ))}
            </Tabs>
        </>
    )
}
