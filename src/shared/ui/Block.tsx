import { Box } from "@mui/material"
import type { ReactNode } from "react"

type BlockVariantType = 'primary' | 'secondary'

interface BlockProps {
  children: ReactNode
  variant?: BlockVariantType
}

const BG_COLOR_MAP: Record<BlockVariantType, string> = {
  primary: '#FFFFFF',
  secondary: '#FAF9FD',
}

export const Block = ({ children, variant = 'primary' }: BlockProps) => {
  const bgColor = BG_COLOR_MAP[variant]

  return (
    <Box sx={{ width: "100%", backgroundColor: bgColor, p: "20px", borderRadius: 4 }}>
      {children}
    </Box>
  )
}
