'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { loginService } from '@/services/auth.service'
import { clearToken, getToken, setToken } from '@/lib/auth'
import { User } from '@/types/auth'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setAuthToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = getToken()
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setAuthToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      const { token, user } = await loginService(email, password)

      setToken(token)
      setAuthToken(token)
      setUser(user)

      // 🔥 Persist for reload
      localStorage.setItem('user', JSON.stringify(user))

      // 🔥 Cookies for middleware
      document.cookie = `token=${token}; path=/`
      document.cookie = `role=${user.role}; path=/`

      router.push('/dashboard')
    } catch {
      alert('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearToken()
    setUser(null)
    setAuthToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
