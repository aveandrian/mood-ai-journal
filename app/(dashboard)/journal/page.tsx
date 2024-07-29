import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import Question from '@/components/Question'
import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-4 md:p-10 h-full ">
      <h2 className="text-3xl mb-8 ">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <NewEntryCard />
          {entries.map((entry) => (
            <Link key={entry.id} href={`/journal/${entry.id}`}>
              <EntryCard entry={entry} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JournalPage
