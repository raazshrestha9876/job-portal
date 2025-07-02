import type { loginSchema, registerSchema } from "@/schema/auth.schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { z } from "zod";
import type { IUser } from "../types/auth";
import { API_URL } from "@/constants/apiUrl";

type RegisterRequest = z.infer<typeof registerSchema>;
type LoginRequest = z.infer<typeof loginSchema>;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/user`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterRequest>({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<IUser, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { data: IUser }) => response.data,
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query<IUser, void>({
      query: () => ({
        url: "/profile/get",
        method: "GET",
      }),
      transformResponse: (response: { data: IUser }) => response.data,
      providesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useGetUserQuery } =
  authApi;
