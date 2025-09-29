import { Page } from '@/widgets/Page';
import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MATERIAL_CREATE_PAGE_ROUTE } from '@/pages/MaterialCreatePage';


export const MaterialListPage = () => {
    return (
        <Page>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">Страница списка материалов</Typography>
                <Button component={RouterLink} to={MATERIAL_CREATE_PAGE_ROUTE} variant="contained">Создать</Button>
            </Stack>
            {/* здесь позже будет список */}
        </Page>
    );
};