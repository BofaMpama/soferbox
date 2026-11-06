import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';
import sanitizeHtml from 'sanitize-html';
import { error } from '@sveltejs/kit';
import { getExcerpt, getFeaturedImage, getReadingTime } from '$lib/server/writings';

type RichTextNode = {
	value?: string;
	content?: RichTextNode[];
};

function richTextToPlainHtml(document: Document, preserveLineBreaks = false): string {
	const escapeHtml = (value: string) =>
		value
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('\n', preserveLineBreaks ? '<br/>' : '\n');
	const getText = (node: unknown): string => {
		if (!node || typeof node !== 'object') return '';

		const richTextNode = node as RichTextNode;
		if (typeof richTextNode.value === 'string') return richTextNode.value;
		return Array.isArray(richTextNode.content) ? richTextNode.content.map(getText).join('') : '';
	};

	return (Array.isArray(document.content) ? document.content : [])
		.map((node) => getText(node).trim())
		.filter(Boolean)
		.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
		.join('');
}

export const load: PageServerLoad = async ({ params, url }) => {
	const categoryTitles = new Map([
		['poems', 'Poems'],
		['stories', 'Short Stories'],
		['blogs', 'Reflections']
	]);
	const categoryTitle = categoryTitles.get(params.category) ?? params.category;
	const contentTypes = new Map([
		['poems', 'poem'],
		['stories', 'story'],
		['blogs', 'blog']
	]);
	const contentType = contentTypes.get(params.category);

	if (!contentType) {
		error(404, 'Writing not found');
	}

	const result = await requestContentful(async (client) => {
		const response = await client.getEntries({
			content_type: contentType,
			'fields.slug': params.slug,
			limit: 1
		});
		const item = response.items[0];
		if (!item) return null;

		const [previousResponse, nextResponse, relatedResponse] = await Promise.all([
			client.getEntries({
				content_type: contentType,
				'sys.createdAt[gt]': item.sys.createdAt,
				order: ['sys.createdAt'],
				limit: 1
			}),
			client.getEntries({
				content_type: contentType,
				'sys.createdAt[lt]': item.sys.createdAt,
				order: ['-sys.createdAt'],
				limit: 1
			}),
			client.getEntries({
				content_type: contentType,
				order: ['-sys.createdAt'],
				'fields.slug[ne]': params.slug,
				limit: 8
			})
		]);
		const previousItem = previousResponse.items[0] ?? null;
		const nextItem = nextResponse.items[0] ?? null;
		const adjacentSlugs = new Set(
			[previousItem?.fields.slug, nextItem?.fields.slug].filter(
				(slug): slug is string => typeof slug === 'string'
			)
		);

		return {
			item,
			previousItem,
			nextItem,
			relatedItems: relatedResponse.items
				.filter((related) => !adjacentSlugs.has(related.fields.slug as string))
				.slice(0, 4)
		};
	});

	if (!result.ok) {
		return {
			category: params.category,
			categoryTitle,
			canonicalUrl: new URL(url.pathname, url.origin).href,
			article: null,
			relatedItems: [],
			previousItem: null,
			nextItem: null,
			contentError: result.error
		};
	}

	const resultData = result.data;
	const item = resultData?.item;
	if (!item) {
		error(404, 'Writing not found');
	}

	const body = item.fields.body as Document | undefined;
	let renderedBody = '';
	if (body) {
		try {
			renderedBody = documentToHtmlString(body, {
				preserveWhitespace: params.category === 'poems',
				stripEmptyTrailingParagraph: true
			});
		} catch (cause) {
			console.error(`Failed to render Contentful rich text for "${params.slug}":`, cause);
			renderedBody = richTextToPlainHtml(body, params.category === 'poems');
		}
	}

	return {
		category: params.category,
		categoryTitle,
		canonicalUrl: new URL(url.pathname, url.origin).href,
		contentError: null,
		article: {
			title: item.fields.title as string,
			coverImage: getFeaturedImage(
				item.fields.coverImage ?? item.fields.cover,
				item.fields.title as string
			),
			readingTime: params.category === 'poems' ? null : getReadingTime(body),
			body: sanitizeHtml(renderedBody, {
				allowedTags: [
					'p',
					'br',
					'hr',
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'strong',
					'em',
					'b',
					'i',
					'u',
					's',
					'ol',
					'ul',
					'li',
					'blockquote',
					'a',
					'sup',
					'sub'
				],
				allowedAttributes: {
					a: ['href']
				},
				allowedSchemes: ['http', 'https', 'mailto']
			}),
			slug: item.fields.slug as string,
			publishedDate: item.sys.createdAt,
			excerpt: params.category === 'poems' ? '' : getExcerpt(item.fields.excerpt)
		},
		relatedItems: resultData.relatedItems.map((related) => ({
			title: related.fields.title as string,
			slug: related.fields.slug as string,
			publishedDate: related.sys.createdAt
		})),
		previousItem: resultData.previousItem
			? {
					title: resultData.previousItem.fields.title as string,
					slug: resultData.previousItem.fields.slug as string
				}
			: null,
		nextItem: resultData.nextItem
			? {
					title: resultData.nextItem.fields.title as string,
					slug: resultData.nextItem.fields.slug as string
				}
			: null
	};
};
