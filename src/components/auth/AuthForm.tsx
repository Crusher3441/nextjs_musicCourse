'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { cn } from '@/utils/cn'

export function AuthForm() {
  const { data: session, status } = useSession()
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (status === 'authenticated') return null

  const handleGoogle = () => {
    setError('')
    signIn('google', { callbackUrl: '/profile' })
  }

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/profile',
      })
      if (result?.error) {
        setError('Invalid email or password')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: email.split('@')[0] }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Registration failed')
        return
      }
      setTab('login')
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-center text-white mb-8">Sign In</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleGoogle}
          disabled={loading}
          className={cn(
            'w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition',
            loading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          )}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-5.15 3.28-8.09"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-5.94-4.63H3.57v2.77c1.18.78 2.58 1.26 4.13 1.26 4.94 0 8.67-3.86 8.67-8.58 0-1.48-.22-2.92-.65-4.33H12v-4.26h5.92c.26-1.37 1.04-2.53 2.21-3.31V4.26H8.27c-1.88 1.48-3.07 3.86-3.07 6.54 0 3.97 3.1 7.2 6.8 7.2h.01v-.01z"
            />
          </svg>
          Continue with Google
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mb-8">or continue with email</p>

      <form onSubmit={tab === 'login' ? handleCredentials : handleRegister}>
        <div className="space-y-3 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-lg bg-black/[0.3] border border-gray-600 focus:ring-2 focus:ring-teal-500 outline-none text-white placeholder-gray-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-black/[0.3] border border-gray-600 focus:ring-2 focus:ring-teal-500 outline-none text-white placeholder-gray-500"
          />
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 disabled:opacity-50 transition"
        >
          {loading ? 'Loading...' : tab === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          {tab === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            className="text-teal-400 hover:underline font-medium"
          >
            {tab === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </form>
    </div>
  )
}