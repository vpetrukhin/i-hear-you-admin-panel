import { getPathsList } from "@/shared/api/pathApi";
import { useQuery } from "@tanstack/react-query";

export const usePathsList = () => {
  return useQuery({
    queryKey: ["paths"],
    queryFn: async () => getPathsList(),
  });
};
