import { Page } from "@/widgets/Page";
import { useNavigate, useParams } from "react-router";

interface Props {
  materialListPageRoute: string;
}

export const MaterialPage = ({ materialListPageRoute }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(materialListPageRoute);
    return;
  }

  return (
    <Page>
      Страница детальной информации о материале {id}
    </Page>
  );
};
