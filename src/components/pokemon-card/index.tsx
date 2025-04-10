'use client'

import { useEffect, useState } from 'react'
import { fetchData, firstUpper } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { gradients } from '../type/colors'

interface PokemonCardProps {
  name: string
}

export default function PokemonCard({ name }: PokemonCardProps) {
  const router = useRouter()
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    getPokemon()
  }, [])

  const getPokemon = async () => {
    const data = await fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`)
    setPokemon(data)
  }

  const backgroundColor = gradients[pokemon?.types[0].type.name ?? 'normal']

  return (
    pokemon && (
      <Card
        className={`py-5 px-2 w-[370px] h-[250px] shadow-xl relative ${backgroundColor}`}
      >
        <CardHeader className="flex justify-between">
          <span className="text-white font-semibold opacity-50 text-8xl">
            #{pokemon.id}
          </span>
          <h4 className="text-3xl font-semibold text-white">
            {firstUpper(name)}
          </h4>
        </CardHeader>
        <CardContent className="flex items-end justify-between">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={`imagem ${pokemon.name}`}
            className="w-[150px] absolute bottom-5 left-30"
          />
        </CardContent>
      </Card>
    )
  )
}
