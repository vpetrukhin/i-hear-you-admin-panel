export type UploadKind = "photo" | "video" | "pdf";

export interface UploadResponse {
    file_id: string;
    url: string;
    kind?: UploadKind;
}

export async function uploadFile(file: File, kind: UploadKind): Promise<UploadResponse> {
    const form = new FormData();
    form.append("file", file);
    form.append("kind", kind);

    const res = await fetch("/api/files", {
        method: "POST",
        body: form,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Upload failed");
    }

    return res.json();
}
