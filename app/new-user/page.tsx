import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerId: user?.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    })
  }

  redirect('/journal')
}

const NewUserPage = async () => {
  await createNewUser()
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      Loading...
    </main>
  )
}

export default NewUserPage
