import { Page } from "@/widgets/Page";
import { PageContent } from "@/widgets/PageContent";
import { Sidebar } from "@/widgets/Sidebar";

export const MaterialListPage = () => {
  return (
    <Page>
      <Sidebar />
      <PageContent children={'Страница с материалами, потом тут будет компонент со списком'} />
    </Page>
  );
};
