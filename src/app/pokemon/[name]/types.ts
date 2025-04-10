interface Pokemon {
  name: string
  sprites: Sprites
  height: number
  weight: number
  abilities: Ability[]
  stats: Stat[]
  types: Type[]
  id: number
}

interface Sprites {
  other: Other
}

interface Other {
  'official-artwork': OfficialArtWork
  dream_world: DreamWorld
}

interface DreamWorld {
  front_default: string
}

interface OfficialArtWork {
  front_default: string
}

interface Ability {
  ability: AbilityDetail
}

interface AbilityDetail {
  name: string
}

interface Stat {
  base_stat: number
  stat: StatDetail
}

interface StatDetail {
  name: string
}

interface Type {
  type: TypeDetail
}

interface TypeDetail {
  name: Types
}

type Types =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
