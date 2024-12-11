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
		serachUser: builder.query<{username: string}, void>({
			query: () => ({
				url: '/search',
				method: 'GET'
			})
		})
	})
})

const {
	useRegisterMutation,
	useLoginMutation,
	useCurrentQuery,
	useLazyCurrentQuery,
	useSerachUserQuery,
	useLazySerachUserQuery
} = userApi;

export const {
	endpoints: {login, register, current, serachUser}
} = userApi;