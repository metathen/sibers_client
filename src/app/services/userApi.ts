import { api } from "./api";
import { User } from "../types";

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<
			{token: string},
			{username: string; password: string}
		>({
			query: (userData) => ({
				url: '/log',
				method: "POST",
				body: userData
			})
		}),
		register: builder.mutation<
			{username: string; password: string},
			{username: string; password: string}
		>({
			query: (userData) => ({
				url: '/reg',
				method: "POST",
				body: userData
			})
		}),
		current: builder.query<User, void>({
			query: () => ({
				url: '/current',
				method: "GET"
			})
		}),
		getUserById: builder.mutation<User, {userId: string}>({
			query: (userData) => ({
				url: `/user`,
				method: "POST",
				body: userData
			}),
		}),
		serachUser: builder.mutation<{username: string}[], {username: string}>({
			query: (body) => ({
				url: '/search',
				method: 'POST',
				body
			})
		})
	})
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useCurrentQuery,
	useLazyCurrentQuery,
	useSerachUserMutation,
	useGetUserByIdMutation
} = userApi;

export const {
	endpoints: {login, register, current, serachUser, getUserById}
} = userApi;