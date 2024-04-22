'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Index() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    const localIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

    if (isLoggedIn || localIsLoggedIn) {
      console.log('Logged!')
      router.push('/pokemons')
    } else {
      console.log('Not Logged!')
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return (
    <div>
      <h1>Loading</h1>
    </div>
  )
}
