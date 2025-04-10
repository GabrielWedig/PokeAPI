interface InfoProps {
  title: string
  children: React.ReactNode
}

export default function Info({ title, children }: InfoProps) {
  return (
    <div className="flex gap-2">
      <span className="font-semibold">{title}:</span>
      <span>{children}</span>
    </div>
  )
}
