import React, { useEffect, useMemo } from "react";
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
    TextField,
    Typography,
    Alert,
    Paper,
    Checkbox,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/shared/api/files";

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
    onSubmit: (payload: any, categoryIds: string[]) => Promise<{ id: string }>;
    initialFile?: File;
    onCancel?: () => void;
}

interface FormValues {
    title: string;
    description: string;
    media_id?: string;
    media_url?: string;
    is_active: boolean;
    subscription_type: "all" | "premium";
    user_groups: UserGroup[];
    category_ids: string[];
    topic?: string;
}

export const MaterialCreateForm: React.FC<MaterialCreateFormProps> = ({
                                                                          categories,
                                                                          isLoading,
                                                                          errors,
                                                                          onSubmit,
                                                                          initialFile,
                                                                          onCancel,
                                                                      }) => {
    const {
        control,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        setValue,
        formState: { errors: formErrors },
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            media_id: "",
            media_url: "",
            is_active: true,
            subscription_type: "all",
            user_groups: [],
            category_ids: [],
            topic: "",
        },
    });

    const uploadMutation = useMutation({
        mutationFn: async (p: { file: File; kind: "photo" | "video" | "pdf" }) =>
            uploadFile(p.file, p.kind),
        onSuccess: (res) => {
            setValue("media_id", res.file_id ?? "", { shouldDirty: true });
            setValue("media_url", res.url ?? "", { shouldDirty: true });
        },
    });

    useEffect(() => {
        if (!initialFile) return;
        const kind: "photo" | "video" | "pdf" = initialFile.type.startsWith("image/")
            ? "photo"
            : initialFile.type === "application/pdf"
                ? "pdf"
                : "video";
        uploadMutation.mutate({ file: initialFile, kind });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialFile]);

    const selectedGroups = watch("user_groups");
    const selectedCategoryIds = watch("category_ids");

    const filteredCategories = useMemo(() => {
        if (!selectedGroups?.length) return categories;
        return categories.filter((c) => selectedGroups.every((g) => c.groups.includes(g)));
    }, [categories, selectedGroups]);

    useEffect(() => {
        const allowed = new Set(filteredCategories.map((c) => c.id));
        const next = (selectedCategoryIds || []).filter((id) => allowed.has(id));
        if (next.length !== (selectedCategoryIds || []).length) {
            setValue("category_ids", next, { shouldValidate: true });
        }
    }, [filteredCategories, selectedCategoryIds, setValue]);

    function buildPayload(v: FormValues) {
        return {
            type: "document",
            title: v.title,
            description: v.description || undefined,
            is_active: v.is_active,
            subscription_type: v.subscription_type,
            user_groups: v.user_groups,
            media_id: v.media_id || undefined,
            media_url: v.media_url || undefined,
            topic: v.topic || undefined,
        };
    }

    const submit = async (v: FormValues) => {
        clearErrors(["title", "category_ids"] as any);
        let hasError = false;

        if (!v.title.trim()) {
            setError("title", { type: "manual", message: "Укажите название файла" });
            hasError = true;
        }
        if (!v.category_ids.length) {
            setError("category_ids" as any, { type: "manual", message: "Выберите категорию" });
            hasError = true;
        }
        if (!v.user_groups.length) {
            setError("user_groups" as any, {
                type: "manual",
                message: "Выберите хотя бы один вариант",
            });
            hasError = true;
        }
        if (hasError) return;

        const payload = buildPayload(v);
        await onSubmit(payload, v.category_ids);
    };

    return (

        <Card
            variant="outlined"
            sx={{
                border: 'none',
                gap: "20px",
                "& .MuiInputLabel-root": {
                    fontWeight: 300,
                    fontSize: "13px",
                    lineHeight: "140%",
                    letterSpacing: 0,
                },
                "& .MuiCardContent-root:last-child": {
                    pb: 0,
                },
                "& .MuiStack-root>:not(style):not(style)": {
                    mt: "20px"
                },
                }}
        >
            <CardContent
                sx={{
                    p: 0,
                }}
            >
                {errors?.common && (
                    <Alert sx={{ mb: 2 }} severity="error">
                        {errors.common}
                    </Alert>
                )}

                {/*{(initialFile || uploadMutation.isSuccess) && (*/}
                    <Paper
                        variant="outlined"
                        sx={{
                            height: "70px",
                            bgcolor: "#FAF9FD",
                            border: "none",
                            borderRadius: "12px",
                            p: "16px",
                            gap: "16px",
                            mb: "20px",
                            fontSize: "13px",
                            fontWeight: 300,
                    }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: "#000",
                                size: "14px",
                                lineHeight: "140%",
                                letterSpacing: 0,
                                }}
                            >
                            {/* Изменить в будущем на получение имени */}
                            {initialFile ? initialFile.name : "document_file_name.pdf"}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                gap: "8px",
                                color: "rgba(0, 0, 0, 0.6)",
                                lineHeight: "140%",
                                letterSpacing: 0,
                                fontSize: "13px",
                                fontWeight: 300,
                            }}
                        >
                            {initialFile ? `${Math.round(initialFile.size / 1024)} Кб` : "100кб"} • Загрузка завершена
                        </Typography>
                    </Paper>
                {/*)}*/}

                <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ p: 0}}>
                    <Stack spacing={3} sx={{ p: 0}}>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (

                                <TextField
                                    variant="standard"
                                    {...field}
                                    value={field.value ?? ""}
                                    label="Название файла"
                                    fullWidth
                                    error={!!formErrors.title}
                                    helperText={(formErrors as any).title?.message}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        gap: "6px",
                                        height: "54px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "140%",
                                        letterSpacing: 0,
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "rgba(0, 0, 0, 0.6)",

                                        },
                                        "& .MuiInputBase-root:after": {
                                            borderBottomColor: "#7751FF",
                                        },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    variant="standard"
                                    {...field}
                                    value={field.value ?? ""}
                                    label="Описание (необязательно)"
                                    fullWidth
                                    multiline
                                    error={!!formErrors.description}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{
                                        gap: "6px",
                                        height: "54px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        lineHeight: "140%",
                                        letterSpacing: 0,
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#686868",
                                        },
                                        "& .MuiInputBase-root:after": {
                                            borderBottomColor: "#7751FF",
                                        },
                                    }}
                                />
                            )}
                        />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} size={6}>
                                <Controller
                                    name="category_ids"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            variant="standard"
                                            fullWidth
                                            error={!!(formErrors as any).category_ids}
                                            sx={{
                                                "& .MuiInputLabel-root.Mui-focused": {
                                                    color: "#7751FF",
                                                },
                                                "& .MuiInputBase-root:after": {
                                                    borderBottomColor: "#7751FF",
                                                },
                                                "& .MuiInputLabel-root.Mui-error": {
                                                    color: "grey.700",
                                                },
                                            }}
                                        >
                                            <InputLabel id="topic-label" variant="standard">Категория</InputLabel>
                                            <Select
                                                {...field}
                                                variant="standard"
                                                labelId="category-label"
                                                value={field.value || []}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            >
                                                {filteredCategories.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.path ? `${option.path.join(" / ")} / ${option.title}` : option.title}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText>
                                                {(formErrors as any).category_ids?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} size={6}>
                                <Controller
                                    name="topic"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            variant="standard"
                                            fullWidth
                                            sx={{
                                                "& .MuiInputLabel-root.Mui-focused": {
                                                    color: "#7751FF",
                                                },
                                                "& .MuiInputBase-root:after": {
                                                    borderBottomColor: "#7751FF",
                                                },
                                            }}
                                        >
                                            <InputLabel id="topic-label" variant="standard">Тема (необязательно)</InputLabel>
                                            <Select
                                                variant="standard"
                                                {...field}
                                                labelId="topic-label"
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value)}
                                            >
                                                <MenuItem value="theme1">Тема 1</MenuItem>
                                                <MenuItem value="theme2">Тема 2</MenuItem>
                                                <MenuItem value="theme3">Тема 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <FormControl component="fieldset">
                            <FormLabel
                                component="legend"
                                sx={{
                                    color: formErrors.user_groups ? "red" : "black",
                                    "&.Mui-focused": {
                                        color: formErrors.user_groups ? "red" : "black",
                                    },
                                }}
                            >
                                Контекст
                            </FormLabel>

                            <Controller
                                name="user_groups"
                                control={control}
                                render={({ field }) => (
                                    <FormGroup>
                                        {(["self", "child"] as UserGroup[]).map((val) => (
                                            <FormControlLabel
                                                key={val}
                                                control={
                                                    <Checkbox
                                                        checked={field.value?.includes(val)}
                                                        onChange={(e) => {
                                                            const next = new Set<string>(field.value || []);
                                                            e.target.checked ? next.add(val) : next.delete(val);
                                                            field.onChange(Array.from(next));
                                                        }}
                                                        sx={{
                                                            color: "#686868",
                                                            "&.Mui-checked": {
                                                                color: "#686868",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    val === "self"
                                                        ? "Я волнуюсь о своём слухе"
                                                        : "Я волнуюсь о слухе ребёнка"
                                                }
                                            />
                                        ))}
                                    </FormGroup>
                                )}
                            />

                            <FormHelperText sx={{ color: "text.secondary" }}>
                                {formErrors.user_groups?.message ??
                                    "Выберите один или оба варианта"}
                            </FormHelperText>
                        </FormControl>

                        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ pt: 0 }}>
                            <Button
                                type="button"
                                variant="text"
                                onClick={onCancel}
                                sx={{
                                    textTransform: "uppercase",
                                    color: "#2B2735",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    lineHeight: "140%",
                                }}
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                variant="text"
                                disabled={isLoading}
                                sx={{
                                    textTransform: "uppercase",
                                    color: "#5D51FF",
                                    fontWeight: "600",
                                    fontSize: "16px",
                                    lineHeight: "140%",
                                }}
                            >
                                {isLoading ? "Сохраняем…" : "Сохранить"}
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};
