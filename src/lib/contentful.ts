import { createClient } from 'contentful';
import { env } from '$env/dynamic/private';

export function getContentfulClient() {
	const space = env.CONTENTFUL_SPACE_ID;
	const accessToken = env.CONTENTFUL_ACCESS_TOKEN;

	if (!space || !accessToken) {
		throw new Error(
			'Contentful is not configured. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN.'
		);
	}

	return createClient({
		space,
		environment: 'master',
		accessToken
	});
}

function isRetryableContentfulError(cause: unknown): boolean {
	if (cause instanceof TypeError) return true;
	if (!cause || typeof cause !== 'object' || !('status' in cause)) return false;

	const status = cause.status;
	return typeof status === 'number' && (status === 429 || status >= 500);
}

function wait(milliseconds: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function requestContentful<T>(
	request: (client: ReturnType<typeof getContentfulClient>) => Promise<T>
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
	for (let attempt = 0; attempt < 2; attempt += 1) {
		try {
			return { ok: true, data: await request(getContentfulClient()) };
		} catch (cause) {
			if (attempt === 0 && isRetryableContentfulError(cause)) {
				console.warn('Temporary Contentful request failure; retrying once:', cause);
				await wait(250);
				continue;
			}

			console.error('Contentful request failed:', cause);
			return {
				ok: false,
				error: 'Writing content is temporarily unavailable. Please try again shortly.'
			};
		}
	}

	throw new Error('Contentful request retry loop exited unexpectedly.');
}
