import { PUBLIC_API_URL } from '$env/static/public';

export class StatusError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
	}
}

type Schema<T> = {
	assert: (data: unknown) => T;
};

type Options = RequestInit & {
	params?: Record<string, string | number>;
};

export function fetchJson<T>(
	fetch: typeof global.fetch,
	endpoint: string,
	schema: Schema<T>,
	options: Options = {}
) {
	const url = new URL(`${PUBLIC_API_URL}${endpoint}`);
	for (const [key, value] of Object.entries(options.params ?? {})) {
		url.searchParams.append(key, String(value));
	}

	return fetch(url, options)
		.then(async (res) => {
			if (res.ok) return res;
			const errorBody = await res.text();
			throw new StatusError(res.status, `Fetch failed: ${url}, Error: ${errorBody}`);
		})
		.then((res) => res.json())
		.then(schema.assert);
}

export function mutate(fetch: typeof global.fetch, endpoint: string, options: Options = {}) {
	const url = new URL(`${PUBLIC_API_URL}${endpoint}`);
	for (const [key, value] of Object.entries(options.params ?? {})) {
		url.searchParams.append(key, String(value));
	}

	return fetch(url, options).then(async (res) => {
		if (res.ok) return res;
		const errorBody = await res.text();
		throw new StatusError(res.status, `Fetch failed: ${url}, Error: ${errorBody}`);
	});
}
