'use client'

import { Card, CardContent } from '@/components/ui/card'
import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()
  const handleOnClick = async () => {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <Card
      className="py-4 cursor-pointer hover:shadow-lg"
      onClick={handleOnClick}
    >
      <CardContent className="h-full p-0">
        <div className="flex h-full  items-center justify-center gap-2">
          <p className="text-3xl font-semibold leading-relaxed">New entry</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default NewEntryCard
