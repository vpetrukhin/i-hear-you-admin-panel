import { MaterialList } from "@/entities/Materials";
import { CreateMaterialButton } from "@/features/CreateMaterial";
import { DeleteMaterialButton } from "@/features/DeleteMaterial";
import { Block } from "@/shared/ui/Block";
import { Page } from "@/widgets/Page";
import { PageContent } from "@/widgets/PageContent";
import { Sidebar } from "@/widgets/Sidebar";
import { Stack, Typography } from "@mui/material";

export const MaterialListPage = () => {
  return (
    <Page>
      <Sidebar />
      <PageContent sx={{ height: "100%" }}>
        <Stack sx={{ width: "100%" }} direction={'column'}>
          <Block sx={{ width: "100%", p: "20px", mb: "24px" }}>
            <Stack flexDirection="row" justifyContent="space-between">
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
                Загрузка контента
              </Typography>
              <CreateMaterialButton />
            </Stack>
          </Block>
          <Block sx={{ height: "100%" }}>
            <MaterialList renderDeleteButton={(material) => (<DeleteMaterialButton material={material} />)} />
          </Block>
        </Stack>
      </PageContent>
    </Page>
  );
};
