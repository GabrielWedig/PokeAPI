import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold">Página não encontrada :(</h1>
      <div className="flex flex-col items-center gap-2">
        <p>A página que você acessar não existe!</p>
        <Link href="/">Voltar para a home</Link>
      </div>
    </div>
  )
}
