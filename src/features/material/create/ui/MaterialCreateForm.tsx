import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/shared/api/files";

type ContentType = "text" | "photo" | "video" | "pdf";
type UserGroup = "self" | "child";

type CategoryOption = {
    id: string;
    title: string;
    path?: string[];
    groups: UserGroup[];
};

interface MaterialCreateFormProps {
    categories: CategoryOption[];
    isLoading?: boolean;
    errors?: { common?: string };
    onSubmit: (
        payload: any,
        categoryIds: string[],
    ) => Promise<{ id: string }>;
}

interface FormValues {
    type: ContentType;
    title: string;
    description: string;
    body?: string;       // type=text
    media_id?: string;   // photo/pdf/video
    media_url?: string;  // photo/pdf
    video_url?: string;  // video
    is_active: boolean;
    subscription_type: "all" | "premium";
    user_groups: UserGroup[];
    category_ids: string[];
}

export const MaterialCreateForm: React.FC<MaterialCreateFormProps> = ({
                                                                          categories,
                                                                          isLoading,
                                                                          errors,
                                                                          onSubmit,
                                                                      }) => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        setValue,
        formState: { errors: formErrors, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            type: "text",
            title: "",
            description: "",
            body: "",
            media_id: "",
            media_url: "",
            video_url: "",
            is_active: true,
            subscription_type: "all",
            user_groups: ["self"],
            category_ids: [],
        },
    });

    const type = watch("type");
    const selectedGroups = watch("user_groups");
    const selectedCategoryIds = watch("category_ids");

    // ===== загрузка файла (mock) =====
    const uploadMutation = useMutation({
        mutationFn: async (p: { file: File; kind: "photo" | "video" | "pdf" }) =>
            uploadFile(p.file, p.kind),
        onSuccess: (res) => {
            if (type === "video") {
                setValue("media_id", res.file_id ?? "", { shouldDirty: true });
                setValue("video_url", res.url ?? "", { shouldDirty: true });
            } else if (type === "photo" || type === "pdf") {
                setValue("media_id", res.file_id ?? "", { shouldDirty: true });
                setValue("media_url", res.url ?? "", { shouldDirty: true });
            }
        },
    });

    const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const kind = type === "photo" ? "photo" : type === "pdf" ? "pdf" : "video";
        uploadMutation.mutate({ file, kind });
        e.currentTarget.value = "";
    };

    // Фильтрация категорий по выбранным группам пользователей
    const filteredCategories = useMemo(() => {
        if (!selectedGroups?.length) return [];
        return categories.filter((c) =>
            selectedGroups.every((g) => c.groups.includes(g)),
        );
    }, [categories, selectedGroups]);

    useEffect(() => {
        const allowed = new Set(filteredCategories.map((c) => c.id));
        const next = (selectedCategoryIds || []).filter((id) => allowed.has(id));
        if (next.length !== (selectedCategoryIds || []).length) {
            setValue("category_ids", next, { shouldValidate: true });
        }
    }, [filteredCategories, selectedCategoryIds, setValue]);

    function buildPayload(v: FormValues) {
        const base: any = {
            type: v.type,
            title: v.title,
            description: v.description || undefined,
            is_active: v.is_active,
            subscription_type: v.subscription_type,
            user_groups: v.user_groups,
        };
        if (v.type === "text") return { ...base, body: v.body };
        if (v.type === "video")
            return {
                ...base,
                media_id: v.media_id || undefined,
                video_url: v.video_url || undefined,
            };

        return {
            ...base,
            media_id: v.media_id || undefined,
            media_url: v.media_url || undefined,
        };
    }

    const submit = async (v: FormValues) => {
        clearErrors([
            "title",
            "body",
            "media_id",
            "media_url",
            "video_url",
            "category_ids",
        ] as any);

        let hasError = false;

        if (!v.title.trim()) {
            setError("title", { type: "manual", message: "Укажите заголовок" });
            hasError = true;
        }

        if (v.type === "text" && !v.body?.trim()) {
            setError("body" as any, {
                type: "manual",
                message: "Добавьте текст материала",
            });
            hasError = true;
        }

        if (v.type === "video") {
            const hasMediaId = Boolean(v.media_id && v.media_id.trim());
            const hasVideoUrl = Boolean(v.video_url && v.video_url.trim());
            if (!hasMediaId && !hasVideoUrl) {
                setError("video_url" as any, {
                    type: "manual",
                    message: "Добавьте ID видео или ссылку",
                });
                hasError = true;
            }
        }

        if (v.type === "photo" || v.type === "pdf") {
            const hasMediaId = Boolean(v.media_id && v.media_id.trim());
            const hasMediaUrl = Boolean(v.media_url && v.media_url.trim());
            if (!hasMediaId && !hasMediaUrl) {
                setError("media_url" as any, {
                    type: "manual",
                    message: "Добавьте ID медиа или URL",
                });
                hasError = true;
            }
        }

        if (!v.category_ids.length) {
            setError("category_ids" as any, {
                type: "manual",
                message: "Привяжите материал к разделу/подразделу",
            });
            hasError = true;
        }

        if (hasError) return;

        const payload = buildPayload(v);
        const { id } = await onSubmit(payload, v.category_ids);
        if (id) navigate(`/materials/${id}`);
    };

    return (
        <Card variant="outlined" sx={{ borderColor: "divider" }}>
            <CardHeader
                title="Новый материал"
                subheader="Сначала выберите разделы, затем заполните карточку материала"
                sx={{ pb: 0.5 }}
            />
            <Divider />
            <CardContent sx={{ pt: 3 }}>
                {errors?.common && (
                    <Alert sx={{ mb: 2 }} severity="error">
                        {errors.common}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
                    <Stack spacing={3}>
                        {/* ===== Привязка к разделам ===== */}
                        <Typography variant="subtitle1" fontWeight={600}>
                            Выберите раздел
                        </Typography>

                        <Controller
                            name="category_ids"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    multiple
                                    options={filteredCategories}
                                    value={filteredCategories.filter((o) =>
                                        field.value?.includes(o.id),
                                    )}
                                    getOptionLabel={(o) =>
                                        o.path ? `${o.path.join(" / ")} / ${o.title}` : o.title
                                    }
                                    onChange={(_e, val) => field.onChange(val.map((v) => v.id))}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => {
                                            const { key, ...tagProps } = getTagProps({ index });
                                            return (
                                                <Chip
                                                    {...tagProps}
                                                    key={option.id ?? key}
                                                    variant="outlined"
                                                    label={option.title}
                                                />
                                            );
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Разделы/подразделы"
                                            placeholder={
                                                filteredCategories.length
                                                    ? "Начните вводить название…"
                                                    : "Сначала выберите группы пользователей ниже"
                                            }
                                            error={!!(formErrors as any).category_ids}
                                            helperText={(formErrors as any).category_ids?.message}
                                        />
                                    )}
                                />
                            )}
                        />

                        <Divider />

                        {/* ===== Основное ===== */}
                        <Typography variant="subtitle1" fontWeight={600}>
                            Основное
                        </Typography>

                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value ?? ""}
                                    label="Заголовок"
                                    required
                                    fullWidth
                                    error={!!formErrors.title}
                                    helperText={(formErrors as any).title?.message}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value ?? ""}
                                    label="Краткое описание"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    inputProps={{ maxLength: 2000 }}
                                    error={!!formErrors.description}
                                    helperText={
                                        (formErrors as any).description?.message ?? "До 2000 символов"
                                    }
                                />
                            )}
                        />

                        <Divider />

                        {/* ===== Содержимое ===== */}
                        <Typography variant="subtitle1" fontWeight={600}>
                            Содержимое
                        </Typography>

                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="type-label">Тип материала</InputLabel>
                                    <Select labelId="type-label" label="Тип материала" {...field}>
                                        <MenuItem value="text">Текст</MenuItem>
                                        <MenuItem value="photo">Фото</MenuItem>
                                        <MenuItem value="video">Видео</MenuItem>
                                        <MenuItem value="pdf">PDF</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />

                        {type === "text" && (
                            <Controller
                                name="body"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        value={field.value ?? ""}
                                        label="Текст материала"
                                        fullWidth
                                        multiline
                                        minRows={6}
                                        error={!!(formErrors as any).body}
                                        helperText={(formErrors as any).body?.message}
                                    />
                                )}
                            />
                        )}

                        {type !== "text" && (
                            <Stack spacing={2}>
                                <Box>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        disabled={uploadMutation.isPending}
                                    >
                                        {uploadMutation.isPending ? "Загружаем…" : "Загрузить файл"}
                                        <input
                                            hidden
                                            type="file"
                                            onChange={handleChooseFile}
                                            accept={
                                                type === "photo"
                                                    ? "image/*"
                                                    : type === "pdf"
                                                        ? "application/pdf"
                                                        : "video/*"
                                            }
                                        />
                                    </Button>
                                    {uploadMutation.isError && (
                                        <FormHelperText error sx={{ ml: 2, display: "inline" }}>
                                            {(uploadMutation.error as Error).message || "Ошибка загрузки"}
                                        </FormHelperText>
                                    )}
                                </Box>

                                {type === "video" ? (
                                    <>
                                        <Controller
                                            name="media_id"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    label="ID загруженного видео (опц.)"
                                                    fullWidth
                                                    error={!!(formErrors as any).media_id}
                                                    helperText={(formErrors as any).media_id?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="video_url"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    label="Ссылка на видео (YouTube/VK)"
                                                    placeholder="https://..."
                                                    fullWidth
                                                    error={!!(formErrors as any).video_url}
                                                    helperText={(formErrors as any).video_url?.message}
                                                />
                                            )}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Controller
                                            name="media_id"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    label="ID медиа (опц.)"
                                                    fullWidth
                                                    error={!!(formErrors as any).media_id}
                                                    helperText={(formErrors as any).media_id?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="media_url"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    value={field.value ?? ""}
                                                    label="URL медиа (опц.)"
                                                    placeholder="https://..."
                                                    fullWidth
                                                    error={!!(formErrors as any).media_url}
                                                    helperText={(formErrors as any).media_url?.message}
                                                />
                                            )}
                                        />
                                    </>
                                )}
                            </Stack>
                        )}

                        <Divider />

                        {/* ===== Доступ и аудитории ===== */}
                        <Typography variant="subtitle1" fontWeight={600}>
                            Доступ и аудитории
                        </Typography>

                        <Controller
                            name="subscription_type"
                            control={control}
                            render={({ field }) => (
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Доступ</FormLabel>
                                    <RadioGroup row {...field}>
                                        <FormControlLabel
                                            value="all"
                                            control={<Radio />}
                                            label="Для всех"
                                        />
                                        <FormControlLabel
                                            value="premium"
                                            control={<Radio />}
                                            label="Премиум"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="user_groups"
                            control={control}
                            render={({ field }) => (
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Группы пользователей</FormLabel>
                                    <FormGroup row>
                                        {(["self", "child"] as UserGroup[]).map((val) => (
                                            <FormControlLabel
                                                key={val}
                                                control={
                                                    <Switch
                                                        checked={field.value?.includes(val)}
                                                        onChange={(e) => {
                                                            const next = new Set<string>(field.value || []);
                                                            e.target.checked ? next.add(val) : next.delete(val);
                                                            field.onChange(Array.from(next));
                                                        }}
                                                    />
                                                }
                                                label={val === "self" ? "Для себя" : "Для ребёнка"}
                                            />
                                        ))}
                                    </FormGroup>
                                    <FormHelperText />
                                </FormControl>
                            )}
                        />

                        <Controller
                            name="is_active"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={<Switch {...field} checked={field.value} />}
                                    label="Опубликовать"
                                />
                            )}
                        />

                        {/* ===== Действия ===== */}
                        <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                            <Button type="submit" variant="contained" disabled={isLoading}>
                                {isLoading ? "Сохраняем…" : "Создать материал"}
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    if (!isDirty) {
                                        navigate("/materials");
                                        return;
                                    }
                                    const ok = window.confirm(
                                        "Изменения не сохранены. Выйти без сохранения?",
                                    );
                                    if (ok) navigate("/materials");
                                }}
                            >
                                Отмена
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};