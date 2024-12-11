import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { BASE_URL } from "../../const";

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/k`,
	prepareHeaders: (headers, {getState}) => { //set auth token
		const token = (getState() as RootState).auth.token || localStorage.getItem('token');
		if(token) headers.set('authorization', `Bearer ${token}`);
		return headers;
	}
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1});//repeated requests
export const api = createApi({
	reducerPath: 'splitApi',
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: true, //disabling caching
	endpoints: () => ({})
})