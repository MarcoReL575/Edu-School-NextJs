import Heading from "@/src/shared/components/typography/Heading"
import { AnunciosSelect } from "../types/types"
import { IconCalendar, IconSpeakerphone } from "@tabler/icons-react"
import { formatTime } from "../../tasks/helpers/formatTime"
import { getCorrectDate } from "../../tasks/helpers/getCorrectDate"

type Props = {
    announce: AnunciosSelect
}

export default function CardAnnounce({ announce }: Props) {
  return (
    <article className="border border-gray-400 p-5 rounded-lg flex flex-col space-y-4">
        <section>
            <Heading className="flex items-center gap-x-4" level={2} > 
                <span><IconSpeakerphone /></span> 
                <span>¡Nuevo Anuncio!</span>
            </Heading>
            <Heading level={3}>
                {announce.title}
            </Heading>
            <hr/>
        </section>

        <section className="flex flex-col gap-y-4">
            <p>
                {announce.content}
            </p>
            <p className=" flex items-center gap-x-2 text-gray-500">
                <span>Publicado:</span>
                <span><IconCalendar size={18} /></span>
                <span>{getCorrectDate(announce.createdAt)}</span>
            </p>
        </section>
    </article>
  )
}
