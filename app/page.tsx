import Image from 'next/image'
import { EmailForm } from '~/components/email-form'
import { prisma } from '~/utils/db'

const getEmails = async () => {
  const data = prisma.email.findMany()
  return data
}

export default async function Home() {
  const data = await getEmails()
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold py-6">mind over body</h1>
      <div className="flex flex-col space-y-2 px-4  mt-10">
        {data.map((email) => (
          <div key={email.id}>{email.address}</div>
        ))}
      </div>
      <div className="mt-60">
        <EmailForm />
      </div>
    </main>
  )
}
