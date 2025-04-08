interface Pokemon {
  name: string
  sprites: Sprites
  height: number
  weight: number
  abilities: Ability[]
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
