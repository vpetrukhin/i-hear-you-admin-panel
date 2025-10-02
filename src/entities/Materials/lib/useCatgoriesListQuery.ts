import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "..";

export const useCategoriesList = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoriesService.getCategoriesList(),
  });
};
