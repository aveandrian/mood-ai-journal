'use client'

import { Button } from '@/components/ui/button'
import { ButtonLoading } from '@/components/ui/button-loading'
import { Input } from '@/components/ui/input'
import { askQuestion } from '@/utils/api'
import { FormEvent, useState } from 'react'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2 ">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-start  w-full md:max-w-lg gap-2"
      >
        <Input
          onChange={(e) => setValue((e.target as HTMLInputElement).value)}
          disabled={loading}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="w-full text-lg rounded-lg bg-background p-4 outline-none focus-visible:ring-offset-0 focus-visible:ring-transparent"
        />
        {loading ? (
          <ButtonLoading />
        ) : (
          <Button disabled={!value} type="submit" className="flex-1 h-full">
            Ask
          </Button>
        )}
      </form>
      {response && <div className="mt-5 ">{response}</div>}
    </div>
  )
}

export default Question
