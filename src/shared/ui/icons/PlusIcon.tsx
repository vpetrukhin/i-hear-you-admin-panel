import { ICON_SIZE_MAP } from "./const"
import type { BaseIconProps } from "./types"

export const PlusIcon = ({ size = 'medium' }: BaseIconProps) => {
  const width = ICON_SIZE_MAP[size]
  const height = ICON_SIZE_MAP[size]

  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5V19" stroke="#7751FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5 12H19" stroke="#7751FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
