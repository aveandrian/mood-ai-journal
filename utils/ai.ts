import { OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { z } from 'zod'
import { PromptTemplate } from '@langchain/core/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { JournalEntry } from '@prisma/client'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote the journal entry.'),
    summary: z.string().describe('Quick sumamry of the entire entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'Is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral and 10 is extreme positive'
      ),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const promt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! Don`t writwe about your day even if it`s in the query!\n{format_instructions}\nEntry:"{entry}"',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await promt.format({
    entry: content,
  })

  return input
}

export const analyze = async (content: string) => {
  const model = new OpenAI({
    model: 'gpt-3.5-turbo-instruct', // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
    temperature: 0,
  })
  const input = await getPrompt(content)
  const res = await model.invoke(input)

  try {
    return parser.parse(res)
  } catch (e) {
    console.log(e)
  }
}

export const qa = async (
  question: string,
  entries: Partial<JournalEntry>[]
) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content!,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })

  const model = new OpenAI({ temperature: 0 })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
