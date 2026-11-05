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

export async function requestContentful<T>(
	request: (client: ReturnType<typeof getContentfulClient>) => Promise<T>
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
	try {
		return { ok: true, data: await request(getContentfulClient()) };
	} catch (cause) {
		console.error('Contentful request failed:', cause);
		return {
			ok: false,
			error: 'Writing content is temporarily unavailable. Please try again shortly.'
		};
	}
}
