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
import { fetchData, firstUpper } from '@/lib/utils'
import { ChangeEvent, useEffect, useState } from 'react'
import { generations, types } from './filters'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import PokemonCard from '@/components/pokemon-card'

interface Pokemon {
  name: string
  url: string
}

interface Filter {
  search: string
  generation: string
  type: string
}

export default function Pokemons() {
  const defaultTitle = 'Pokémons'

  const [title, setTitle] = useState<string>(defaultTitle)
  const [page, setPage] = useState<number>(1)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    const allPokemons = getCachePokemons()

    if (allPokemons.length) {
      setPokemons(allPokemons)
    }
    getPokemons()
  }, [])

  const getPokemons = async () => {
    const data = await fetchData(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000'
    )
    setPokemons(data.results)
    localStorage.setItem('allPokemons', JSON.stringify(data.results))
  }

  const limit = 12
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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    const pokemonsList: Pokemon[] = getCachePokemons()
    const filtered = pokemonsList.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(value)
    )
    setPokemons(filtered)
  }

  const getCachePokemons = () => {
    const allPokemons = localStorage.getItem('allPokemons')
    if (allPokemons) {
      return JSON.parse(allPokemons)
    }
    return []
  }

  const handleReset = () => {
    const allPokemons = getCachePokemons()
    setPokemons(allPokemons)
    setTitle(defaultTitle)
    reset()
  }

  const { register, reset, control } = useForm<Filter>({
    defaultValues: {
      search: '',
      generation: '',
      type: ''
    }
  })

  return (
    <section className="px-80 py-10">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold mb-15">{title}</h1>
        <form className="flex gap-2">
          <Input
            placeholder="Pesquisar"
            {...register('search', {
              onChange: handleSearch
            })}
          />
          <Controller
            control={control}
            name="generation"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  handleGeneration(value)
                }}
                value={field.value}
              >
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
            )}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  handleType(value)
                }}
                value={field.value}
              >
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
            )}
          />
          <Button type="button" variant="ghost" onClick={handleReset}>
            Limpar
          </Button>
        </form>
      </div>
      <ul className="grid grid-cols-3 gap-3 min-h-[calc(100vh-160px)] mb-20">
        {paginated.length === 0 && <p>Pokémon não encontrado.</p>}
        {paginated.map((pokemon, i) => (
          <li key={i}>
            <PokemonCard name={pokemon.name} />
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
