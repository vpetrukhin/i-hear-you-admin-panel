import { Page } from '@/widgets/Page';
import { Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MATERIAL_CREATE_PAGE_ROUTE } from '@/pages/MaterialCreatePage';
import { PageContent } from "@/widgets/PageContent";
import { Sidebar } from "@/widgets/Sidebar";

export const MaterialListPage = () => {
  return (
    <Page>
      <Sidebar />
      <PageContent children={'Страница с материалами, потом тут будет компонент со списком'}>
          <Button component={RouterLink} to={MATERIAL_CREATE_PAGE_ROUTE} variant="contained">Создать</Button>
      </PageContent>
    </Page>
  );
};
