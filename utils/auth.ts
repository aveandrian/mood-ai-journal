import { prisma } from '@/utils/db'
import { auth } from '@clerk/nextjs/server'

export const getUserByClerkId = async () => {
  const { userId } = auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerId: userId as string,
    },
  })

  return user
}
