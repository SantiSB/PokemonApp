'ue client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/state/AuthContext.jsx'
import { UseLoginReturn } from '@/types/authContextTypes'
import { useAlert } from '@/state/AlertContext'

export default function useLogin(): UseLoginReturn {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { login, isLoggedIn } = useAuth()
  const { showAlert } = useAlert()

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

    const result = await login(email, password)
    if (result.success) {
      showAlert(result.message, 'success')
      setEmail('')
      setPassword('')
      router.push('/pokemons')
    } else {
      showAlert(result.message, 'error')
    }

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
