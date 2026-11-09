import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const categories = new Set(['poems', 'stories', 'blogs']);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maxRequestLength = 5000;

function getSupabaseConfig() {
	const supabaseUrl = env.SUPABASE_URL?.replace(/\/+$/, '');
	const secretKey = env.SUPABASE_SECRET_KEY;

	if (!supabaseUrl || !secretKey) {
		console.error('Comments are not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY.');
		return null;
	}

	try {
		const parsedUrl = new URL(supabaseUrl);
		const isLocalHttp =
			parsedUrl.protocol === 'http:' &&
			['localhost', '127.0.0.1', '[::1]'].includes(parsedUrl.hostname);
		if (parsedUrl.protocol !== 'https:' && !isLocalHttp) throw new Error('Invalid protocol');
	} catch {
		console.error('Comments are not configured. SUPABASE_URL must be a valid URL.');
		return null;
	}

	return { supabaseUrl, secretKey };
}

function isValidArticle(category: string, slug: string) {
	return categories.has(category) && slug.length <= 200 && slugPattern.test(slug);
}

function getHeaders(secretKey: string) {
	return {
		apikey: secretKey,
		'content-type': 'application/json'
	};
}

function unavailable() {
	return json(
		{ error: 'Comments are temporarily unavailable. Please try again later.' },
		{
			status: 503,
			headers: { 'cache-control': 'no-store' }
		}
	);
}

export const GET: RequestHandler = async ({ params, fetch }) => {
	if (!isValidArticle(params.category, params.slug)) {
		return json({ error: 'Invalid writing page.' }, { status: 400 });
	}

	const config = getSupabaseConfig();
	if (!config) return unavailable();

	const query = new URLSearchParams({
		select: 'id,name,body,created_at',
		category: `eq.${params.category}`,
		slug: `eq.${params.slug}`,
		status: 'eq.approved',
		order: 'created_at.desc',
		limit: '100'
	});

	try {
		const response = await fetch(`${config.supabaseUrl}/rest/v1/comments?${query}`, {
			headers: getHeaders(config.secretKey),
			cache: 'no-store'
		});
		if (!response.ok) {
			console.error(`Comments read failed with status ${response.status}.`);
			return unavailable();
		}

		return json(await response.json(), { headers: { 'cache-control': 'no-store' } });
	} catch (cause) {
		console.error('Comments read request failed:', cause);
		return unavailable();
	}
};

export const POST: RequestHandler = async ({ params, request, url, fetch }) => {
	if (!isValidArticle(params.category, params.slug)) {
		return json({ error: 'Invalid writing page.' }, { status: 400 });
	}

	if (request.headers.get('origin') !== url.origin) {
		return json({ error: 'Comment submission was rejected.' }, { status: 403 });
	}

	const contentLength = Number(request.headers.get('content-length') ?? 0);
	if (contentLength > maxRequestLength) {
		return json({ error: 'Your comment is too long.' }, { status: 413 });
	}

	let requestBody: unknown;
	try {
		const rawBody = await request.text();
		if (rawBody.length > maxRequestLength) {
			return json({ error: 'Your comment is too long.' }, { status: 413 });
		}
		requestBody = JSON.parse(rawBody);
	} catch {
		return json({ error: 'Invalid comment submission.' }, { status: 400 });
	}

	if (!requestBody || typeof requestBody !== 'object') {
		return json({ error: 'Invalid comment submission.' }, { status: 400 });
	}

	const input = requestBody as Record<string, unknown>;
	if (typeof input.website === 'string' && input.website.trim()) {
		return json({ message: 'Thanks! Your comment is awaiting approval.' }, { status: 202 });
	}

	const name = typeof input.name === 'string' ? input.name.trim() : '';
	const body = typeof input.body === 'string' ? input.body.trim() : '';
	if (name.length < 1 || name.length > 60 || body.length < 1 || body.length > 2000) {
		return json(
			{ error: 'Enter a name (up to 60 characters) and a comment (up to 2,000 characters).' },
			{
				status: 400
			}
		);
	}

	const config = getSupabaseConfig();
	if (!config) return unavailable();

	try {
		const response = await fetch(`${config.supabaseUrl}/rest/v1/comments`, {
			method: 'POST',
			headers: {
				...getHeaders(config.secretKey),
				prefer: 'return=minimal'
			},
			body: JSON.stringify({
				category: params.category,
				slug: params.slug,
				name,
				body,
				status: 'pending'
			})
		});
		if (!response.ok) {
			console.error(`Comment submission failed with status ${response.status}.`);
			return unavailable();
		}
	} catch (cause) {
		console.error('Comment submission request failed:', cause);
		return unavailable();
	}

	return json(
		{ message: 'Thanks! Your comment is awaiting approval.' },
		{ status: 202, headers: { 'cache-control': 'no-store' } }
	);
};
