'use client'

import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { firstUpper } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { generations, types } from './filters'
import axios from 'axios'

interface Pokemon {
  name: string
  url: string
}

export default function Pokemons() {
  const router = useRouter()

  const [title, setTitle] = useState<string>('Pokémons')
  const [page, setPage] = useState<number>(1)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    getPokemons()
  }, [])

  const fetchData = async (url: string) => {
    setPage(1)
    try {
      const { data } = await axios.get(url)
      return data
    } catch (error: unknown) {
      console.log(error)
      setPokemons([])
    }
  }

  const getPokemons = async () => {
    const data = await fetchData(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000'
    )
    setPokemons(data.results)
  }

  const limit = 10
  const offset = (page - 1) * limit
  const paginated = pokemons.slice(offset, offset + limit)

  const handlePrevious = () => page > 1 && setPage((page) => page - 1)
  const handleNext = () =>
    offset + limit < pokemons.length && setPage((page) => page + 1)

  const handleGeneration = async (value: string) => {
    const data = await fetchData(
      `https://pokeapi.co/api/v2/generation/${value}`
    )
    const generation = generations.find(
      (generation) => generation.value === value
    )
    setTitle(`Pokémons - Geração ${generation?.name}`)
    setPokemons(data.pokemon_species)
  }

  const handleType = async (value: string) => {
    const data = await fetchData(`https://pokeapi.co/api/v2/type/${value}`)
    setTitle(`Pokémons - Tipo ${firstUpper(value)}`)
    setPokemons(data.pokemon.map((p: any) => p.pokemon))
  }

  return (
    <section className="px-80 py-10">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold mb-10">{title}</h1>
        <div className="flex gap-2">
          <Select onValueChange={handleGeneration}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Geração" />
            </SelectTrigger>
            <SelectContent>
              {generations.map((generation, i) => (
                <SelectItem key={i} value={generation.value}>
                  {generation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type, i) => (
                <SelectItem key={i} value={type}>
                  {firstUpper(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className="flex flex-col gap-2 mb-10">
        {paginated.map((pokemon, i) => (
          <li
            key={i}
            className="w-full border rounded-lg px-5 py-3 flex justify-between items-center"
          >
            <h4 className="text-lg">{firstUpper(pokemon.name)}</h4>
            <Button
              variant="outline"
              onClick={() => router.push(`/pokemon/${pokemon.name}`)}
            >
              Detalhes
            </Button>
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
