export const getEntityIds = (entities?: { id: number }[]) => {
  if (!entities) {
    return []
  }

  return entities.map((entity) => String(entity.id))
}
