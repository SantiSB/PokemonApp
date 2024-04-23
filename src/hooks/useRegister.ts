'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/state/AuthContext.jsx'
import { UseRegisterFormOutput } from '@/types/authContextTypes'
import { useAlert } from '@/state/AlertContext'

export function useRegister(): UseRegisterFormOutput {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { register, isLoggedIn } = useAuth()
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
    if (password !== confirmPassword) {
      showAlert("Passwords don't match.", 'error')
      return
    }

    const result = await register(email, password)
    if (!result.success) {
      showAlert(result.message, 'error')
      return
    }

    showAlert('¡Registrado exitosamente!', 'success')

    setTimeout(() => {
      router.push('/login')
    }, 3000)

    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    loading,
  }
}
