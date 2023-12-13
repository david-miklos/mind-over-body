'use server'
import { z } from 'zod'
import { prisma } from './db'
import { revalidatePath } from 'next/cache'

export async function addEmail(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email().min(1),
  })

  //   parse the form data by schema
  const parse = schema.safeParse({ email: formData.get('email') })

  if (!parse.success) {
    return { message: 'Please provide a valid email address' }
  }

  const data = parse.data

  //   check if email already exists
  const findEmail = await prisma.email.findUnique({
    where: {
      address: data.email,
    },
  })

  if (findEmail) {
    return { message: 'Email already exists' }
  }

  //   add email
  try {
    const createEmail = await prisma.email.create({
      data: {
        address: data.email,
      },
    })

    revalidatePath('/')
    return { message: `Successfully added email ${createEmail.address}` }
  } catch (e) {
    return { message: 'Failed to add email' }
  }
}
