import { firstUpper } from '@/lib/utils'
import { Progress } from '../ui/progress'

interface StatProps {
  name: string
  value: number
}

export default function Stat({ name, value }: StatProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <span className="font-semibold">{firstUpper(name)}:</span>
        <span>{value}</span>
      </div>
      <Progress value={value} />
    </div>
  )
}
