import { MaterialsList } from "@/features/MaterialsList";
import { Page } from "@/widgets/Page";
import { PageContent } from "@/widgets/PageContent";
import { Sidebar } from "@/widgets/Sidebar";

export const MaterialListPage = () => {
  return (
    <Page>
      <Sidebar />
      <PageContent>
        <MaterialsList />
      </PageContent>
    </Page>
  );
};
