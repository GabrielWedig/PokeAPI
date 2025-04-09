import Stat from '@/components/stat'
import Type from '@/components/type'
import { Button } from '@/components/ui/button'
import { firstUpper } from '@/lib/utils'
import Link from 'next/link'

interface PokemonPageProps {
  params: {
    name: string
  }
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = params

  const pokemon: Pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  ).then((res) => res.json())

  return (
    <section className="flex items-center h-[calc(100vh-160px)] px-80">
      <div className="flex gap-20 items-center relative">
        <Link href="/" className="absolute top-0">
          <Button variant="outline">Voltar</Button>
        </Link>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={`imagem ${pokemon.name}`}
        />
        <div className="flex flex-col gap-5">
          <div className="flex gap-10 items-end">
            <h1 className="text-7xl font-semibold">
              {firstUpper(pokemon.name)}
            </h1>
            <div className="flex gap-2">
              {pokemon.types.map((tp, i) => (
                <Type key={i} type={tp.type.name} />
              ))}
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde optio
            vitae architecto nulla nam! Nam, sequi obcaecati nesciunt ad tenetur
            ullam autem natus saepe, est, beatae aperiam tempore quae
            blanditiis!
          </p>
          <div className="flex gap-5">
            <span className="font-semibold">Altura: {pokemon.height}</span>
            <span className="font-semibold">Peso: {pokemon.weight}</span>
            <div>
              <span className="font-semibold">Habilidades: </span>
              {pokemon.abilities.map((ab, i) => (
                <span className="font-semibold" key={i}>
                  {firstUpper(ab.ability.name)}
                  {i < pokemon.abilities.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-3">
            {pokemon.stats.map((st, i) => (
              <Stat key={i} name={st.stat.name} value={st.base_stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
