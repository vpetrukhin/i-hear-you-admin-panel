export type CreateContentResponse = { id: string };
export async function createContent(dto: any): Promise<CreateContentResponse> {
    const res = await fetch('/api/content', { method: 'POST', body: JSON.stringify(dto) });
    if (!res.ok) throw new Error('Create content failed');
    return res.json(); // { id }
}
export async function linkContentCategories(id: string, categoryIds: string[]): Promise<{ ok: true }> {
    const res = await fetch(`/api/content/${id}/categories`, { method: 'POST', body: JSON.stringify({ categories: categoryIds.map((cid, i) => ({ id: cid, position: i+1 })) }) });
    if (!res.ok) throw new Error('Link categories failed');
    return res.json(); // { ok: true }
}