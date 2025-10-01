import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { MATERIALS_FRONT_URL_MAP, materialService } from "@/entities/Materials";
import { formatDate } from "../../MaterialsList/utils";

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  materialListPageRoute: string;
}

export const MaterialsPage = ({ materialListPageRoute }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: file,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["materials", id],
    queryFn: () => materialService.fileRequest(Number(id)),
  });

  if (!id) {
    navigate(materialListPageRoute);
    return;
  }

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box sx={{ width: "100%", backgroundColor: "#FFFFFF", p: "20px" }}>
      {/* Навигационная цепочка */}
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize={"medium"} />}
      >
        <Link
          underline="hover"
          color="inherit"
          href={MATERIALS_FRONT_URL_MAP.list}
        >
          Материалы
        </Link>
        <Link underline="none" color="inherit">
          {file?.name}
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

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Статус:
            </Typography>
            <Chip
              label={file?.is_active ? "Активен" : "Неактивен"}
              color={file?.is_active ? "success" : "default"}
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Название файла:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {file?.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Тип файла:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {file?.file_type}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Категория:
            </Typography>
            {file?.categories.map((category, index) => (
              <Typography
                key={category.id || index}
                variant="body1"
                fontWeight="medium"
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
            {file?.topics.map((topic, index: number) => (
              <Typography
                key={topic.id || index}
                variant="body1"
                fontWeight="medium"
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
              {formatDate(file?.created_at ?? "")}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" color="text.secondary">
              Описание:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {file?.description}
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
