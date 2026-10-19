import { API_URL } from "./config";

export type RemoteProgress = {
	data: Record<string, string>;
	version: number;
	updatedAt: string;
};

export type PutResult =
	| { ok: true; version: number; updatedAt: string }
	| { ok: false; current: RemoteProgress | null };

export class ApiError extends Error {
	constructor(readonly status: number) {
		super(`API respondeu ${status}`);
	}
}

export type SyncClient = {
	get(): Promise<RemoteProgress | null>;
	put(data: Record<string, string>, baseVersion: number): Promise<PutResult>;
	remove(): Promise<void>;
};

/** Cliente da API de progresso; o código de sincronização vai como Bearer. */
export function createSyncClient(
	syncKey: string,
	baseUrl = API_URL,
	fetchFn: typeof fetch = (...args) => fetch(...args),
): SyncClient {
	const request = (method: string, body?: unknown) =>
		fetchFn(`${baseUrl}/v1/progress`, {
			method,
			headers: {
				Authorization: `Bearer ${syncKey}`,
				...(body === undefined ? {} : { "Content-Type": "application/json" }),
			},
			body: body === undefined ? undefined : JSON.stringify(body),
		});

	return {
		async get() {
			const res = await request("GET");
			if (res.status === 404) return null;
			if (!res.ok) throw new ApiError(res.status);
			return (await res.json()) as RemoteProgress;
		},
		async put(data, baseVersion) {
			const res = await request("PUT", { data, baseVersion });
			if (res.status === 409) {
				const { current } = (await res.json()) as {
					current: RemoteProgress | null;
				};
				return { ok: false, current };
			}
			if (!res.ok) throw new ApiError(res.status);
			return { ok: true, ...(await res.json()) };
		},
		async remove() {
			const res = await request("DELETE");
			if (!res.ok && res.status !== 404) throw new ApiError(res.status);
		},
	};
}
