import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("/api/content", async ({ request }) => {
        await request.text().catch(() => "");
        const id = Math.random().toString(36).slice(2);
        return HttpResponse.json({ id }, { status: 200 });
    }),

    // --- привязать материал к категориям ---
    http.post("/api/content/:id/categories", async () => {
        return HttpResponse.json({ ok: true }, { status: 200 });
    }),

    // --- загрузка файла (фото/видео/pdf) ---
    http.post("/api/files", async ({ request }) => {
        const form = await request.formData().catch(() => null);

        const file = form?.get("file") as File | null;
        const kind = (form?.get("kind") as string) || "unknown";

        const file_id = Math.random().toString(36).slice(2);
        const name =
            (file && "name" in file ? (file as any).name : "upload.bin") as string;

        const url = `/mock-cdn/${file_id}/${encodeURIComponent(name)}`;

        return HttpResponse.json({ file_id, url, kind }, { status: 200 });
    }),
];
