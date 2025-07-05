import { createSlice } from "@reduxjs/toolkit";
import type { IApplicationState } from "../types/application";

const initialState: IApplicationState = {
  applications: [],
  selectedIndex: -1,
  isApplyJobDialogOpen: false,
};

const application = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    applyJobDialogOpen: (state, action) => {
      state.selectedIndex = action.payload.index;
      state.isApplyJobDialogOpen = action.payload.open;
    },
  },
});

export const { setApplications, applyJobDialogOpen } = application.actions;

export default application.reducer;
