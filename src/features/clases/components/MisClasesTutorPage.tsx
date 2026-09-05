import Heading from "@/src/shared/components/typography/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/shared/components/ui/tabs";
import { getTutorChildrenAction } from "../../parents/actions/parentsActions";
import { FullSession } from "@/src/lib/auth-server";
import ClasesSectionGrid from "./ClasesSectionGrid";

type Props = {
    session: FullSession;
}

export default async function MisClasesTutorPage({ session }: Props) {

    const children = await getTutorChildrenAction();

    if (children.length === 0) {
        return (
            <>
                <Heading level={2}>Bienvenido(a), {session.user.name}</Heading>
                <p className="text-center mt-5">Aún no tienes hijos(as) vinculados a tu cuenta.</p>
            </>
        )
    }

    const renderChildClases = (studentId: string, groupId: string | null) => (
        groupId
            ? <ClasesSectionGrid groupId={groupId} studentId={studentId} />
            : <p className="text-center mt-5">Este alumno no cuenta con materias asignadas.</p>
    )

    return (
        <>
            <Heading level={2}>Bienvenido(a), {session.user.name}</Heading>

            <section className="">
                {children.length >= 2 ? (
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
                                {renderChildClases(child.id, child.groupId)}
                            </TabsContent>
                        ))}
                    </Tabs>
                ) : (
                    renderChildClases(children[0].id, children[0].groupId)
                )}
            </section>

        </>
    )
}
