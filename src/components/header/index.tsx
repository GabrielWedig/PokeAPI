import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex fixed justify-between items-center px-80 py-2 bg-red-500 w-full">
      <div className="flex gap-5 items-center">
        <img className="w-20" src="/pokebola.png" alt="pokebola" />
        <h1 className="font-semibold text-2xl text-white">PokéAPI</h1>
      </div>

      {/* <nav>
        <ul className="flex gap-5">
          <li>
            <Link className='text-white' href="/">Pokemons</Link>
          </li>
        </ul>
      </nav> */}
    </header>
  )
}
