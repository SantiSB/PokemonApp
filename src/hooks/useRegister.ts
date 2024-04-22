'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { UseRegisterFormOutput } from '@/types/authContextTypes'

export function useRegister(): UseRegisterFormOutput {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { register, isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/pokemons')
    } else {
      setLoading(false)
    }
  }, [isLoggedIn, router])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    register(email, password)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    router.push('/login')
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
