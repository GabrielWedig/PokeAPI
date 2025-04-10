'use client'

import { useEffect, useState } from 'react'
import { fetchData, firstUpper } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useRouter } from 'next/navigation'
import { colors } from '../type/colors'
import Tilt from 'react-parallax-tilt'

interface PokemonCardProps {
  name: string
}

export default function PokemonCard({ name }: PokemonCardProps) {
  const router = useRouter()
  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    console.log('aqui', name)
    getPokemon()
  }, [name])

  const getPokemon = async () => {
    const data = await fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`)
    setPokemon(data)
  }

  const backgroundColor = colors[pokemon?.types[0].type.name ?? 'normal']
  const image =
    pokemon?.sprites.other.dream_world.front_default ??
    pokemon?.sprites.other['official-artwork'].front_default

  return (
    pokemon && (
      <button
        className="cursor-pointer"
        onClick={() => router.push(pokemon.name)}
      >
        <Tilt>
          <Card
            className={`py-5 px-2 w-[370px] h-[270px] shadow-xl relative flex flex-col justify-between items-start ${backgroundColor}`}
          >
            <CardHeader className="flex justify-between">
              <span className="text-white font-semibold opacity-50 text-8xl">
                #{pokemon.id}
              </span>
            </CardHeader>
            <CardContent>
              {image && (
                <img
                  src={image}
                  alt={`imagem ${pokemon.name}`}
                  className="w-[150px] absolute bottom-15 left-40"
                />
              )}
              <h4 className="text-3xl font-semibold text-white">
                {firstUpper(name)}
              </h4>
            </CardContent>
          </Card>
        </Tilt>
      </button>
    )
  )
}
