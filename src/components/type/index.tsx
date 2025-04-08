import { firstUpper } from '@/lib/utils'
import { colors } from './colors'

interface TypeProps {
  type: Types
}

export default function Type({ type }: TypeProps) {
  return (
    <div
      className={`px-3 py-1 h-max rounded-lg font-semibold text-white bold shadow-xl ${colors[type]}`}
    >
      {firstUpper(type)}
    </div>
  )
}
