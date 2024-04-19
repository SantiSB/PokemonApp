import MainSection from '@/components/MainSection'
import { PokemonProvider } from '@/state/PokemonContext'

export default function Home() {
  return (
    <PokemonProvider>
      <MainSection />
    </PokemonProvider>
  )
}
