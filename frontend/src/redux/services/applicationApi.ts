import { API_URL } from "@/constants/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IApplication } from "../types/application";
import {
  updateApplicationStatusSchema,
  type applyJobSchema,
} from "@/schema/application.schema";
import type { z } from "zod";

type ApplyJobRequest = z.infer<typeof applyJobSchema>;
type UpdateApplicationStatusRequest = z.infer<
  typeof updateApplicationStatusSchema
>;

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/application`,
    credentials: "include",
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    applyJob: builder.mutation<void, { data: ApplyJobRequest; jobId: string }>({
      query: ({ jobId, data }) => ({
        url: `apply/${jobId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    getApplications: builder.query<IApplication[], string>({
      query: (jobId) => ({
        url: `/get/${jobId}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IApplication[] }) => response.data,
      providesTags: ["Application"],
    }),

    getAppliedJobs: builder.query<IApplication[], void>({
      query: () => ({
        url: `/get`,
        method: "GET",
      }),
      transformResponse: (response: { data: IApplication[] }) => response.data,
      providesTags: ["Application"],
    }),

    updateApplicationStatus: builder.mutation<
      void,
      { data: UpdateApplicationStatusRequest; applicationId: string }
    >({
      query: ({ applicationId, data }) => ({
        url: `/status/${applicationId}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useUpdateApplicationStatusMutation,
} = applicationApi;
