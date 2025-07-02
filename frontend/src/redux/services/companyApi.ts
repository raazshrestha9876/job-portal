import { API_URL } from "@/constants/apiUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICompany } from "../types/company";
import type {
  addCompanySchema,
  updateCompanySchema,
} from "@/schema/company.schema";
import type { z } from "zod";

type AddCompanyRequest = z.infer<typeof addCompanySchema>;
type UpdateCompanyRequest = z.infer<typeof updateCompanySchema>;

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/company`,
    credentials: "include",
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getCompany: builder.query<ICompany[], void>({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
      transformResponse: (response: { data: ICompany[] }) => response.data,
      providesTags: ["Company"],
    }),

    addCompany: builder.mutation<void, AddCompanyRequest>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),

    updateCompany: builder.mutation<
      void,
      { data: UpdateCompanyRequest; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),

    deleteCompany: builder.mutation<void, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
