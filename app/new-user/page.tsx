import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { prisma } from '~/utils/db'

async function handleNewUser() {
  const user = await currentUser()

  if (user === null) {
    throw new Error('No current user found.')
  }

  const found = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  console.log(found)

  if (!found) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.username,
      },
    })
  }

  redirect('/')
}

export default async function NewUser() {
  await handleNewUser()

  return <div>handling new user...</div>
}
