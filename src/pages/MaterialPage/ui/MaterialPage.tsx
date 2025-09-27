import {Page} from "@/widgets/Page";
import {useNavigate, useParams} from "react-router";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import {
    Container,
    Typography,
    Box,
    Breadcrumbs,
    Link,
    useMediaQuery,
    useTheme,
} from '@mui/material';

interface Props {
    materialListPageRoute: string;
}

export const MaterialPage = ({materialListPageRoute}: Props) => {
    // Получение ID из URL
    const {id} = useParams();
    const navigate = useNavigate();

    const content = {
        breadcrumbs: [
            {
                text: 'Главная',
                url: '/materials',
            },
            {
                text: 'Статьи(Категория)',
                url: '/materials/articles',
            },
        ],
        title: 'Как развивать у ребёнка умение говорить в слуховых аппаратах',
        imageUrl: 'https://ihearyou.ru/upload/iblock/d05/vus7v5685idff9zde4x07xodvo9xck0s.jpg',
        text: `<p>Это пример простого шаблона страницы, созданного с использованием Material UI.
                    Здесь представлена навигация сверху, навигационная цепочка, пагинация, заголовок,
                    центрированное изображение и этот текст. Вы можете настроить стили и содержимое под свои нужды.</p>
                    <p>Это пример простого шаблона страницы, созданного с использованием Material UI.
                    Здесь представлена навигация сверху, навигационная цепочка, пагинация, заголовок,
                    центрированное изображение и этот текст. Вы можете настроить стили и содержимое под свои нужды.</p>`
    };

    if (!id) {
        navigate(materialListPageRoute);
        return;
    }

    // Хук для определения мобильного экрана
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Экран < 600px

    return (
        <Page>

            {/* Навигационная цепочка */}
            <Box sx={{mb: isMobile ? 1 : 2}}>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<NavigateNextIcon fontSize={isMobile ? 'small' : 'medium'}/>}
                >
                    {content.breadcrumbs.map((item, i) => (
                        <Link underline="hover" color="inherit" href={item.src} key={i}>
                            {item.text}
                        </Link>
                    ))}

                </Breadcrumbs>
            </Box>

            {/* Основной контент */}
            <Container maxWidth="md" sx={{textAlign: 'center', py: 2}}>

                <Typography
                    variant={isMobile ? 'h4' : 'h3'} // h4 для мобильных, h3 для десктопов
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: isMobile ? '1.2rem' : '2rem', // Уменьшенный шрифт для мобильных
                        px: isMobile ? 1 : 0, // Дополнительные горизонтальные отступы на мобильных
                    }}
                >
                    {content.title}
                </Typography>

                {/* Изображение по центру */}
                <Link href={content.imageUrl}>

                    <Box sx={{my: isMobile ? 2 : 4}}>
                        <img
                            src={content.imageUrl}
                            alt={content.title}
                            style={{maxWidth: '100%', height: 'auto', borderRadius: '8px'}}
                        />
                    </Box>
                </Link>

                {/* Текст */}
                <Typography md={{my: 2}}
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                maxWidth: isMobile ? '100%' : '800px', fontSize: isMobile ? '2.75vw' : '1.5vw',
                                lineHeight: '140%', margin: 'auto', textAlign: 'left',
                                mb: 1.5
                            }}
                            dangerouslySetInnerHTML={{__html: content.text}}
                />

            </Container>
        </Page>
    );
};
