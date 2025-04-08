interface Pokemon {
  name: string
  sprites: Sprites
  height: number
  weight: number
  abilities: Ability[]
  stats: Stat[]
  types: Type[]
}

interface Sprites {
  other: Other
}

interface Other {
  'official-artwork': OfficialArtWork
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
  stat: StatDeatil
}

interface StatDeatil {
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
