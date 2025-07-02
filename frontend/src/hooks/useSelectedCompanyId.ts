import type { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

export const useSelectedCompanyId = () => {
  const { selectedIndex, companies } = useSelector(
    (state: RootState) => state.companies
  );

  const selectedCompany = companies?.[selectedIndex];

  return selectedCompany?._id ?? null;
};
