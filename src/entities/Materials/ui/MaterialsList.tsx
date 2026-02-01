import DownloadIcon from "@mui/icons-material/Download";
import {
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatDate } from "@/shared/lib/formatDate";
import type { MaterialType } from "../types";
import { useMaterialsList } from "../lib/useMaterialsList";
import { useState, type ReactNode } from "react";
import useModal from "@/shared/hooks/useModal";
import { ModalWrapper } from "@/shared/ui/ModalWrapper";
import { MaterialForm } from "./MaterialForm";
import type { MaterialFormFields } from "../model/material";

interface Props {
  renderDeleteButton: (material: MaterialType) => ReactNode;
}

const columns = [
  { title: "файл" },
  { title: "категория" },
  { title: "формат" },
  { title: "дата загрузки" },
  { title: "статус" },
];

export const MaterialList = ({ renderDeleteButton }: Props) => {
  const materialPreviewModal = useModal();
  const { materials, error, isLoading } = useMaterialsList();

  const [materialData, setMaterialData] = useState<MaterialType | undefined>();

  const handleDownload = (file: MaterialType) => {
    const link = document.createElement("a");
    link.href = file.file;
    link.download = file.name || "";
    link.target = "_blank"; // для кроссдоменности
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNameClick = (material: MaterialType) => {
    setMaterialData(material);
    materialPreviewModal.openModal();
  };

  const handleMaterialPreviewCancel = () => {
    materialPreviewModal.closeModal();
    setMaterialData(undefined);
  };

  const handleMaterialPreviewSubmit = (materialData: MaterialFormFields) => {
    console.log(materialData);
    // save material data to server
    materialPreviewModal.closeModal();
    setMaterialData(undefined);
  };

  return (
    <>
      <TableContainer>
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
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {materials?.map((material) => (
              <TableRow key={material.id}>
                <TableCell
                  sx={{
                    color: "#2B2735",
                    fontSize: "14px",
                    lineHeight: "140%",
                    fontWeight: "500",
                    p: "16px 12px 20px 12px",
                    borderBottom: "1px solid #E3E3E3",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNameClick(material)}
                >
                  {material.name}
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
                  <Typography
                    key={material.categories?.toString()}
                    sx={{
                      color: "#2B2735",
                      fontSize: "14px",
                      lineHeight: "140%",
                      fontWeight: "500",
                    }}
                  >
                    {material.categories
                      ?.map((category) => category.name)
                      .join(", ")}
                  </Typography>
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
                  {material.file_type}
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
                  {formatDate(material.created_at)}
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
                  {material.is_active ? "Активный" : "Не активный"}
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
                      onClick={() => handleDownload(material)}
                      sx={{
                        color: "#2B2735",
                        p: "0",
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      <DownloadIcon />
                    </IconButton>
                    {renderDeleteButton(material)}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {materials?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Файлы не найдены
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Не удалось загрузить список материалов.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalWrapper
        onClose={materialPreviewModal.closeModal}
        isOpen={materialPreviewModal.isOpen}
      >
        <MaterialForm
          materialData={materialData}
          onCancel={handleMaterialPreviewCancel}
          onSubmit={handleMaterialPreviewSubmit}
        />
      </ModalWrapper>
    </>
  );
};
