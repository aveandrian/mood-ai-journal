'use client'

import { updateEntry } from '@/utils/api'
import { Analysis, JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { Textarea } from '@/components/ui/textarea'

const Editor = ({
  entry,
}: {
  entry: JournalEntry & { analysis: Analysis | null }
}) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, summary, color, subject, negative } = analysis!
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  useAutosave({
    data: value,
    onSave: async (newVal) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, newVal)
      setAnalysis(updated.analysis)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 h-full">
        {isLoading && (
          <div className="bg-white flex items-center justify-center text-muted-foreground">
            ...loading
          </div>
        )}
        <Textarea
          className="w-full h-full min-h-[70vh] border-none p-8 text-xl outline-none focus-visible:ring-offset-0 focus-visible:ring-0 text-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l  flex flex-col border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div className="px-4 h-full">
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex border-b border-t border-black/10 items-center justify-between"
              >
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-end">{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
