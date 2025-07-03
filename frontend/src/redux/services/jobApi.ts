import { API_URL } from "@/constants/apiUrl";
import type { postJobSchema } from "@/schema/job.schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { z } from "zod";
import type { IJobs } from "../types/job";

type PostJobRequest = z.infer<typeof postJobSchema>;

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/job`,
    credentials: "include",
  }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    postJob: builder.mutation<void, PostJobRequest>({
      query: (data) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    getRecruiterJobs: builder.query<IJobs[], void>({
      query: () => ({
        url: "/get-recruiter-jobs",
        method: "GET",
      }),
      transformResponse: (response: { data: IJobs[] }) => response.data,
      providesTags: ["Job"],
    }),

    getRecruiterJobDetails: builder.query<IJobs, string>({
      query: (id) => ({
        url: `/get-recruiter-job/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: IJobs }) => response.data,
      providesTags: ["Job"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetRecruiterJobsQuery,
  useGetRecruiterJobDetailsQuery,
} = jobApi;
