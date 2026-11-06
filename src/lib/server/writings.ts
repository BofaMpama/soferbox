import type { Asset } from 'contentful';
import { getContentfulClient } from '$lib/contentful';

export async function getAllEntries(
	client: ReturnType<typeof getContentfulClient>,
	contentType: string
) {
	const items = [];
	let skip = 0;
	let total = Number.POSITIVE_INFINITY;

	while (skip < total) {
		const page = await client.getEntries({
			content_type: contentType,
			order: ['-sys.createdAt'],
			limit: 100,
			skip
		});
		items.push(...page.items);
		total = page.total;
		if (!page.items.length) break;
		skip += page.items.length;
	}

	return items;
}

function getLocalizedString(value: unknown): string | undefined {
	if (typeof value === 'string') return value;
	if (!value || typeof value !== 'object') return undefined;
	return Object.values(value).find(
		(localeValue): localeValue is string => typeof localeValue === 'string'
	);
}

export function getFeaturedImage(cover: unknown, title: string) {
	if (!cover || typeof cover !== 'object') return null;

	const asset = cover as Asset;
	const imageUrl = getLocalizedString(asset.fields?.file?.url);
	if (!imageUrl) return null;

	return {
		url: imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl,
		alt: getLocalizedString(asset.fields.description) || title
	};
}

function getRichTextValue(node: unknown): string {
	if (!node || typeof node !== 'object') return '';

	const richTextNode = node as { value?: unknown; content?: unknown };
	if (typeof richTextNode.value === 'string') return richTextNode.value;
	return Array.isArray(richTextNode.content)
		? richTextNode.content.map(getRichTextValue).join(' ')
		: '';
}

export function getReadingTime(body: unknown): number {
	const wordCount = getRichTextValue(body).trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(wordCount / 200));
}
