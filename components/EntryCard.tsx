import { Card, CardContent } from '@/components/ui/card'
import { Analysis, JournalEntry } from '@prisma/client'

const EntryCard = ({
  entry,
}: {
  entry: JournalEntry & { analysis: Analysis | null }
}) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <>
      <Card className="py-4 hover:shadow-lg">
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="text-lg font-medium">{entry.analysis?.summary}</div>
            <div className="text-sm text-muted-foreground">{date}</div>
            <p className="text-lg font-semibold leading-relaxed">
              {entry.analysis?.mood}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default EntryCard
