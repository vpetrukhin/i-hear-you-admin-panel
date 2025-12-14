import type { ElementType } from "react";

export type IconSizeType = 'medium' | 'small';

export interface BaseIconProps {
  size?: IconSizeType
  color?: string
}

export type IconElement = ElementType<BaseIconProps>
