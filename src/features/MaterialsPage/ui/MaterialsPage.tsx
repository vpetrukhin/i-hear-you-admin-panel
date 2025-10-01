import {
    Container,
    Breadcrumbs,
    Link,
    Divider,
    Chip,
    CircularProgress,
    Typography,
    Box,
    Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import {
    materialService,
    MATERIALS_FRONT_URL_MAP
} from "@/entities/Materials";
import {formatDate} from "../../MaterialsList/utils";

import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface Props {
    materialListPageRoute: string;
}

export const MaterialsPage = ({materialListPageRoute}: Props) => {
    const {id} = useParams();
    const navigate = useNavigate();

    if (!id) {
        navigate(materialListPageRoute);
        return;
    }

    const {
        data: files = [],
        isLoading,
        error,
    } = useQuery<Error>({
        queryKey: ["materials", id],
        queryFn: () => materialService.fileRequest(id),
    });

    if (isLoading) return <CircularProgress/>;
    if (error) return <Typography color="error">{error.message}</Typography>;

    return (

        <Box sx={{width: "100%", backgroundColor: "#FFFFFF", p: "20px"}}>
            {/* Навигационная цепочка */}
            <Breadcrumbs
                aria-label="breadcrumb"
                separator={<NavigateNextIcon fontSize={'medium'}/>}
            >
                <Link underline="hover" color="inherit" href={MATERIALS_FRONT_URL_MAP.list}>
                    Материалы
                </Link>
                <Link underline="none" color="inherit">
                    {files.name}
                </Link>
            </Breadcrumbs>

            <Container maxWidth="" sx={{py: 4}}>

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
                <Divider sx={{marginBottom: 2}}/>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>


                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Статус:
                        </Typography>
                        <Chip
                            label={files.is_active ? 'Активен' : 'Неактивен'}
                            color={files.is_active ? 'success' : 'default'}
                            size="small"
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Название файла:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                            {files.name}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Тип файла:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                            {files.file_type}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Категория:
                        </Typography>
                        {files.categories.map((category, index) => (
                            <Typography
                                key={category.id || index}
                                variant="body1" fontWeight="medium"
                            >
                                {category.name}
                                {index < files.categories.length - 1 ? ", " : ""}
                            </Typography>
                        ))}
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Тема:
                        </Typography>
                        {files.topics.map((topic, index) => (
                            <Typography
                                key={topic.id || index}
                                variant="body1" fontWeight="medium"
                            >
                                {topic.name}
                                {index < files.topics.length - 1 ? ", " : ""}
                            </Typography>
                        ))}

                    </Box>
                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Дата загрузки:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                            {formatDate(files.created_at)}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Описание:
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                            {files.description}
                        </Typography>
                    </Box>

                </Box>

                <Box sx={{marginTop: 3, display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon/>}
                        href={files.file}
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
