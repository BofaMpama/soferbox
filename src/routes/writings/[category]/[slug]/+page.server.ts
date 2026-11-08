import type { PageServerLoad } from './$types';
import { requestContentful } from '$lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Document } from '@contentful/rich-text-types';
import sanitizeHtml from 'sanitize-html';
import { error } from '@sveltejs/kit';
import { getExcerpt, getExcerptLine, getFeaturedImage, getReadingTime } from '$lib/server/writings';

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

		const relatedResponse = await client.getEntries({
			content_type: contentType,
			order: ['-sys.createdAt'],
			'fields.slug[ne]': params.slug,
			limit: 4
		});

		return { item, relatedItems: relatedResponse.items };
	});

	if (!result.ok) {
		return {
			category: params.category,
			canonicalUrl: new URL(url.pathname, url.origin).href,
			article: null,
			relatedItems: [],
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
		canonicalUrl: new URL(url.pathname, url.origin).href,
		contentError: null,
		article: {
			title: item.fields.title as string,
			coverImage: getFeaturedImage(
				item.fields.coverImage ?? item.fields.cover,
				item.fields.title as string
			),
			readingTime: getReadingTime(body),
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
			excerpt:
				params.category === 'poems'
					? getExcerptLine(item.fields.excerpt) || getExcerptLine(body)
					: getExcerpt(item.fields.excerpt)
		},
		relatedItems: resultData.relatedItems.map((related) => ({
			title: related.fields.title as string,
			slug: related.fields.slug as string,
			excerpt:
				params.category === 'poems'
					? getExcerptLine(related.fields.excerpt) || getExcerptLine(related.fields.body)
					: '',
			publishedDate: related.sys.createdAt
		}))
	};
};
