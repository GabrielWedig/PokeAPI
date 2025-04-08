interface Props {
  params: {
    name: string
  }
}

export default async function PokemonPage({ params }: Props) {
  const { name } = params

  const pokemon: Pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  ).then((res) => res.json())

  return (
    <section>
      <h1>{pokemon.name}</h1>
      <div className="flex">
        <div>
          <span>Altura: {pokemon.height}</span>
          <span>Peso: {pokemon.weight}</span>
          <span>Habilidades:</span>
          <div>
            {pokemon.abilities.map((ab, i) => (
              <span key={i}>{ab.ability.name}</span>
            ))}
          </div>
        </div>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={`imagem ${pokemon.name}`}
        />
      </div>
    </section>
  )
}
