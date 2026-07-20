import { ReactElement } from "react";

type Props = {
  titleCard: string;
  icon: ReactElement;
  content: number;
}

export default function CardStatsHome({ content, icon, titleCard }: Props) {


  return (
    <div className="border border-gray-600 rounded-lg p-2">
        <p className="text-center text-lg font-semibold capitalize">{titleCard}</p>
        <div className="flex items-center justify-around">
          <p className="text-2xl text-center">{content} {titleCard.includes('asistencia') && '%'}</p>
          <span className="border border-gray-300 p-2 rounded-lg">{icon}</span>
        </div>
    </div>
  )
}
