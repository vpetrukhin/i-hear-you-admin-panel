import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  Link,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { columns, formatDate } from "../utils";
import {
  MATERIALS_FRONT_URL_MAP,
  materialService,
  type MaterialType,
} from "@/entities/Materials";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const MaterialsList = () => {
  const queryClient = useQueryClient();

  const {
    data: files = [],
    isLoading,
    error,
  } = useQuery<MaterialType[], Error>({
    queryKey: ["materials"],
    queryFn: () => materialService.listRequest(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => materialService.deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      alert(error.message || "Ошибка при удалении файла");
    },
  });

  const handleDelete = (file: MaterialType) => {
    deleteMutation.mutate(file.id);
  };

  const handleDownload = (file: MaterialType) => {
    const link = document.createElement("a");
    link.href = file.file;
    link.download = file.name || "";
    link.target = "_blank"; // для кроссдоменности
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  return (
    <Box sx={{ width: "100%", backgroundColor: "#FFFFFF", p: "20px" }}>

      <Typography
        align="left"
        color="#2B2735"
        variant="h1"
        sx={{
          mb: "24px",
          fontSize: "24px",
          fontWeight: "700",
          lineHeight: "150%",
        }}
      >
        Загруженный контент
      </Typography>

      <TableContainer sx={{}}>
        <Table sx={{ border: "none" }}>
          <TableHead
            sx={{
              backgroundColor: "#FAF9FD",
              textTransform: "uppercase",
            }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    fontSize: "14px",
                    lineHeight: "140%",
                    fontWeight: "600",
                    color: "#686868",
                    border: "none",
                    p: "8px 12px 8px 12px",
                  }}
                  key={column.title}
                >
                  {column.title}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  border: "none",
                }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell
                  sx={{
                    color: "#2B2735",
                    fontSize: "14px",
                    lineHeight: "140%",
                    fontWeight: "500",
                    p: "16px 12px 20px 12px",
                    borderBottom: "1px solid #E3E3E3",
                  }}
                >
                  <Link
                    href={`${MATERIALS_FRONT_URL_MAP.list}/${file.id}`}
                    color="#2B2735"
                    sx={{ textDecoration: "none" }}
                  >
                    {file.name}
                  </Link>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#2B2735",
                    fontSize: "14px",
                    lineHeight: "140%",
                    fontWeight: "500",
                    p: "16px 12px 20px 12px",
                    borderBottom: "1px solid #E3E3E3",
                  }}
                >
                  {file.categories.map((category, index) => (
                    <Typography
                      key={category.id || index}
                      sx={{
                        color: "#2B2735",
                        fontSize: "14px",
                        lineHeight: "140%",
                        fontWeight: "500",
                      }}
                    >
                      {category.name}
                      {index < file.categories.length - 1 ? ", " : ""}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#2B2735",
                    fontSize: "14px",
                    lineHeight: "140%",
                    fontWeight: "500",
                    p: "16px 12px 20px 12px",
                    borderBottom: "1px solid #E3E3E3",
                  }}
                >
                  {file.file_type}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#2B2735",
                    fontSize: "14px",
                    lineHeight: "140%",
                    fontWeight: "500",
                    p: "16px 12px 20px 12px",
                    borderBottom: "1px solid #E3E3E3",
                  }}
                >
                  {formatDate(file.created_at)}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#2B2735",
                    fontSize: "14px",
                    lineHeight: "140%",
                    fontWeight: "500",
                    p: "16px 12px 20px 12px",
                    borderBottom: "1px solid #E3E3E3",
                  }}
                >
                  {file.is_active ? "Активный" : "Не активный"}
                </TableCell>
                <TableCell
                  sx={{
                    p: "16px",
                    width: "100px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton
                      aria-label="скачать"
                      onClick={() => handleDownload(file)}
                      sx={{
                        color: "#2B2735",
                        p: "0",
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      aria-label="удалить"
                      onClick={() => handleDelete(file)}
                      sx={{
                        color: "#2B2735",
                        p: "0",
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {files.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Файлы не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
