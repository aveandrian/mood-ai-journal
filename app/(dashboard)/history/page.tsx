import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)

  return { analyses, avg }
}

const HistoryPage = async () => {
  const { avg, analyses } = await getData()
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-4 text-3xl font-semibold">{`Avg. Sentiment ${avg}`}</div>
      <div className="w-full min-h-[50vh] h-full p-10">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default HistoryPage
