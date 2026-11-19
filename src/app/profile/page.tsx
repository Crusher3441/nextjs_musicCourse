import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) return notFound()

  return (
    <div className="min-h-screen bg-black/[0.96] py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
      <div className="max-w-lg bg-gray-900 p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-2">
          {session.user?.name || 'No name'}
        </h2>
        <p className="text-gray-400 mb-4">{session.user?.email}</p>
        <p className="text-sm text-gray-500 mb-4">ID: {session.user?.id}</p>
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="Avatar"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full mb-4"
            priority
          />
        )}
        <a
          href="/api/auth/signout"
          className="text-red-400 hover:underline"
        >
          Sign out
        </a>
      </div>
    </div>
  )
}