import { PUBLIC_API_URL } from '$env/static/public';
import { fetchJson, mutate, StatusError } from '$lib/api';
import { loginFormSchema, user } from './types';

export const getCurrentUser = async (fetch: typeof global.fetch) => {
	return fetchJson(fetch, '/auth/me', user).catch((e) => {
		if (e instanceof StatusError && e.status === 401) return null;
		throw e;
	});
};

export const login = async (fetch: typeof global.fetch, body: typeof loginFormSchema.infer) => {
	return mutate(fetch, '/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
};

export const getLogoutUrl = async (currentPageUrl: string | undefined) => {
	return `${PUBLIC_API_URL}/auth/logout${currentPageUrl ? `?redirectUrl=${encodeURIComponent(currentPageUrl)}` : ''}`;
};
