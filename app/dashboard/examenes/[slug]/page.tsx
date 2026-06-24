import TakeExam from '@/src/features/examenes/components/TakeExam'
import { examService } from '@/src/features/examenes/services/examService'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function TakeExamPage({ params }: Props ) {
    const { slug } = await params
    const exam = await examService.getExamBySlug(slug);

  return (
    <>
        {exam ? <TakeExam examDetails={exam} slug={slug} /> : <div>Aún no hay un examen</div>}
        
    </>
  )
}