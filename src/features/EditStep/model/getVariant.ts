export type VariantType = {
  id: string
  value: string
}

export interface VariantDTO {
  id: string,
  name: string,
}


const getVariant = (data: VariantDTO): VariantType => {
  return {
    id: String(data.id),
    value: data.name,
  }
}

export const getVariants = (data: VariantDTO[]) => data.map(getVariant)

