// src/lib/utils/images.js
export function optimizedImage(url, { width = 1200, height, quality = 75, format = 'jpg' } = {}) {
	if (!url) return null;

	const absolute = url.startsWith('//') ? `https:${url}` : url;
	const params = new URLSearchParams({
		w: String(width),
		fm: format,
		q: String(quality)
	});

	if (height) {
		params.set('h', String(height));
		params.set('fit', 'fill');
	}

	return `${absolute}?${params.toString()}`;
}