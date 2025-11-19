import {
  Container,
  Breadcrumbs,
  Link,
  Divider,
  Switch,
  FormControlLabel,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {
  MATERIALS_FRONT_URL_MAP,
  materialService,
  type MaterialType,
} from "@/entities/Materials";
import { formatDate } from "../../MaterialsList/utils";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, type ChangeEvent } from 'react';

interface Props {
  materialListPageRoute: string;
}

export const MaterialsPage = ({ materialListPageRoute }: Props) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (id: number) => materialService.fileActive(id, checked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials", id] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message || "Ошибка при обновлении файла");
    },
  });
  const {
    data: file,
    isLoading,
    error,
  } = useQuery<MaterialType, Error>({
    queryKey: ["materials", id],
    queryFn: () => materialService.fileRequest(Number(id)),
  });

  if (!file) return <Typography color="error">Файл не найден</Typography>;
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setChecked(checked);

    updateMutation.mutate(Number(id));
  };

  if (!id) {
    navigate(materialListPageRoute);
    return;
  }

  return (
    <Box sx={{ width: "100%", backgroundColor: "#FFFFFF", p: "20px" }}>
      {/* Навигационная цепочка */}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize={'medium'} />}
      >
        <Link underline="hover" color="inherit" href={MATERIALS_FRONT_URL_MAP.list}>
          Материалы
        </Link>
        <Link underline="none" color="inherit">
          {file.name}
        </Link>
      </Breadcrumbs>

      <Container sx={{ py: 4 }}>

        <Typography
          align="left"
          color="#2B2735"
          variant="h1"
          sx={{
            mb: "12px",
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "150%",
          }}
        >
          Детали файла
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Статус: <FormControlLabel
                control={
                  <Switch
                    color="success"
                    checked={!!file.is_active}
                    onChange={handleChange}
                  />
                }
                label={file.is_active ? 'Активен' : 'Неактивен'}
                sx={{ marginLeft: 'auto' }}
              />
            </Typography>

          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Название файла:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {file.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Тип файла:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {file.file_type}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Категория:
            </Typography>
            {file.categories.map((category, index) => (
              <Typography
                key={category.id || index}
                variant="body1" fontWeight="medium"
              >
                {category.name}
                {index < file.categories.length - 1 ? ", " : ""}
              </Typography>
            ))}
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Тема:
            </Typography>
            {file.topics.map((topic, index) => (
              <Typography
                key={topic.id || index}
                variant="body1" fontWeight="medium"
              >
                {topic.name}
                {index < file.topics.length - 1 ? ", " : ""}
              </Typography>
            ))}

          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Дата загрузки:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {formatDate(file.created_at)}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Описание:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {file.description}
            </Typography>
          </Box>

        </Box>

        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            href={file?.file ?? ""}
            target="_blank"
            style={{
              padding: "15px 30px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              textTransform: "uppercase",
              fontSize: 16,
              lineHeight: "140%",
              fontWeight: "600",
              color: "#fff",
              borderRadius: "8px",
              backgroundColor: "#2B2735",
            }}
          >
            Скачать
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
