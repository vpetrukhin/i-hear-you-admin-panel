import { ICON_SIZE_MAP } from "./const"
import type { BaseIconProps } from "./types"

export const ArrowUpIcon = ({ size = 'medium', color }: BaseIconProps) => {
  const iconSize = ICON_SIZE_MAP[size]

  const currentColor = color ?? "currentColor"
  return (
    <svg width={iconSize} height={iconSize} viewBox={`0 0 ${iconSize} ${iconSize}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19V5" stroke={currentColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M5 12L12 5L19 12" stroke={currentColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}
