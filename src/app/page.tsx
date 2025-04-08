'use client'

import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { firstUpper } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Pokemon = {
  name: string
  url: string
}

type Response = {
  count: number
  results: Pokemon[]
  next: string | null
  previous: string | null
}

export default function Pokemons() {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10'

  const [url, setUrl] = useState(baseUrl)
  const [response, setResponse] = useState<Response>()

  const router = useRouter()

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((response: Response) => {
        setResponse(response)
      })
  }, [url])

  const handleNext = () => setUrl((url) => response?.next ?? url)
  const handlePrevious = () => setUrl((url) => response?.previous ?? url)

  return (
    <section className="px-80 py-40">
      <h1 className="text-4xl font-semibold mb-10">Pokémons</h1>

      <ul className="flex flex-col gap-2 mb-10">
        {response?.results.map((pokemon, i) => (
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
