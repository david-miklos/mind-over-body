import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  auth,
  currentUser,
} from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '~/utils/db'

const simulateRequest = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = [
        { id: 1, data: 'foo' },
        { id: 2, data: 'boo' },
      ]
      resolve(result)
    }, 2000)
  })

const getPosts = async () => {
  // const data = await prisma.post.findMany()
  const data = await simulateRequest()
  return data
}

export default async function Home() {
  const data = await getPosts()
  return (
    <main>
      <nav className="flex border-b p-4 border-slate-900">
        <div className="w-full flex justify-center items-center">
          mind over body
        </div>
        <div className="min-w-fit flex space-x-4">
          <SignedIn>
            <Link href={'/user-profile'}>account</Link>
            <SignOutButton>
              <button>sign out</button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button>sign in</button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
      <h1>Hi</h1>
      {data.map((post) => (
        <div key={post.id}>{post.data}</div>
      ))}
    </main>
  )
}
