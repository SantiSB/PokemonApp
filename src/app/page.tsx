'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Loading from './loading'

export default function Index() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const localIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (isLoggedIn || localIsLoggedIn) {
      router.push('/pokemons')
    } else {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return <Loading />
}
