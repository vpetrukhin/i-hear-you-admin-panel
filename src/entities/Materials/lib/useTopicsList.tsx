import { useQuery } from "@tanstack/react-query";
import { topicsService } from "..";

export const useTopicsList = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: () => topicsService.getTopicsList(),
  });
};
