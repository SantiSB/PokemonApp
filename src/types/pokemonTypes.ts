export interface Pokemon {
  id: number
  name?: string | null
  height?: number | null
  weight?: number | null
  base_experience?: number | null
  url?: string | null
  moves?: Move[] | null
  abilities?: Ability[] | null
  sprites?: PokemonSprites | null
  image?: string | null
}

interface PokemonSprites {
  other?: {
    home?: {
      front_default?: string | null
    } | null
    dream_world?: {
      front_default?: string | null
    } | null
  } | null
  front_default?: string | null
}

interface Move {
  move?: {
    name?: string | null
    url?: string | null
  } | null
}

interface Ability {
  ability?: {
    name?: string | null
    url?: string | null
  } | null
  is_hidden?: boolean | null
  slot?: number | null
}
