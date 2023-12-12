import Link from 'next/link'

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <nav className="flex border-b py-4 px-12 border-slate-900">
        <div className="w-full flex  items-center">
          <Link href={'/'}>mind over body</Link>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  )
}
