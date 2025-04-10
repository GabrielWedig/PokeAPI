import Info from '@/components/info'
import Stat from '@/components/stat'
import Type from '@/components/type'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetchData, firstUpper } from '@/lib/utils'
import Link from 'next/link'

interface PokemonPageProps {
  params: Promise<{
    name: string
  }>
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params

  const getPokemon = async () =>
    fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`)

  const pokemon: Pokemon = await getPokemon()

  return (
    <section className="flex justify-center h-[calc(100vh-160px)] px-80 py-10">
      {pokemon && (
        <Card>
          <CardHeader className="flex gap-5 w-full">
            <Link href="/">
              <Button variant="outline">Voltar</Button>
            </Link>
            <div>
              <CardTitle>Detalhes do Pokémon</CardTitle>
              <CardDescription>
                Conheça os detalhes e habilidades deste incrível Pokémon.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex items-center gap-30">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={`imagem ${pokemon.name}`}
            />
            <div className="flex flex-col gap-5">
              <h1 className="text-7xl font-semibold">
                {firstUpper(pokemon.name)}
              </h1>
              <div className="flex gap-2 mb-10">
                {pokemon.types.map((tp, i) => (
                  <Type key={i} type={tp.type.name} />
                ))}
              </div>
              <Tabs defaultValue="info" className="w-[400px] min-h-[400px]">
                <TabsList>
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="evolution">Evolução</TabsTrigger>
                </TabsList>
                <TabsContent value="info">
                  <Info title="Id">{pokemon.id}</Info>
                  <Info title="Altura">{pokemon.height}cm</Info>
                  <Info title="Peso">{pokemon.weight}kg</Info>
                  <Info title="Habilidades">
                    {pokemon.abilities.map((ab, i) => (
                      <span key={i}>
                        {firstUpper(ab.ability.name)}
                        {i < pokemon.abilities.length - 1 && ', '}
                      </span>
                    ))}
                  </Info>
                </TabsContent>
                <TabsContent value="stats" className="flex flex-col gap-2">
                  {pokemon.stats.map((st, i) => (
                    <Stat key={i} name={st.stat.name} value={st.base_stat} />
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )}
      {!pokemon && <p className="self-end">Ocorreu um erro inesperado.</p>}
    </section>
  )
}
