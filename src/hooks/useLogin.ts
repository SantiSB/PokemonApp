'ue client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { UseLoginReturn } from '@/types/authContextTypes'

export default function useLogin(): UseLoginReturn {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { login, isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/pokemons')
    } else {
      setLoading(false)
    }
  }, [isLoggedIn, router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    await login(email, password)

    setEmail('')
    setPassword('')
    setLoading(false)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
  }
}
