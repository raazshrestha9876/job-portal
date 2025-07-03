import type { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

export const useSelectedJob = () => {
  const { selectedIndex, jobs } = useSelector((state: RootState) => state.jobs);
  const selectedJob = jobs?.[selectedIndex];
  return selectedJob ?? null;
};
