import Image from 'next/image'
import { prisma } from '~/utils/db'

const getPosts = async () => {
  const data = await prisma.post.findMany()
  return data
}

export default async function Home() {
  const data = await getPosts()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>Hi</div>
      {data.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </main>
  )
}
