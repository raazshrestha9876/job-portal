import { createSlice } from "@reduxjs/toolkit";
import type { IJobsState } from "../types/job";

const initialState: IJobsState = {
  jobs: [],
  selectedIndex: -1,
  isJobDeleteDialogOpen: false,
  isJobEditDialogOpen: false,
};

const job = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    jobDeleteDialogOpen: (state, action) => {
      state.selectedIndex = action.payload.index;
      state.isJobDeleteDialogOpen = action.payload.open;
    },
    jobEditDialogOpen: (state, action) => {
      state.selectedIndex = action.payload.index;
      state.isJobEditDialogOpen = action.payload.open;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const { jobDeleteDialogOpen, jobEditDialogOpen, setJobs } = job.actions;

export default job.reducer;
