'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/state/AuthContext.jsx'
import Loading from '@/app/loading'

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
