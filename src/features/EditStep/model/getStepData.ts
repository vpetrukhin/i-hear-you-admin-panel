import { getVariants, type VariantDTO, type VariantType } from "./getVariant"

export type StepDataType = {
  name: string
  message: string
  variants: VariantType[]
}

interface GetStepDataProps {
  name: string
  message: string
  variants: VariantDTO[]
}

export const getStepData = ({ name, message, variants }: GetStepDataProps): StepDataType => {
  return {
    name,
    message,
    variants: getVariants(variants),
  }
}
