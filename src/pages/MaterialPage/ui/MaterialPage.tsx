import { MaterialsPage } from "@/features/MaterialsPage";
import { Page } from "@/widgets/Page";
import { PageContent } from "@/widgets/PageContent";
import { Sidebar } from "@/widgets/Sidebar";

export const MaterialPage = () => {
  return (
    <Page>
      <Sidebar />
      <PageContent>
        <MaterialsPage materialListPageRoute={"/materials"} />
      </PageContent>
    </Page>
  );
};
