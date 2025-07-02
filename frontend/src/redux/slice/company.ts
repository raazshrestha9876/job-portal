import { createSlice } from "@reduxjs/toolkit";
import type { ICompanyState } from "../types/company";

const initialState: ICompanyState = {
  companies: [],
  selectedIndex: -1,
  isCompanyDeleteDialogOpen: false,
};

const company = createSlice({
  name: "companies",
  initialState,
  reducers: {
    companyDeleteDialogOpen: (state, action) => {
      state.selectedIndex = action.payload.index;
      state.isCompanyDeleteDialogOpen = action.payload.open;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});

export const { companyDeleteDialogOpen, setCompanies } = company.actions;

export default company.reducer;
