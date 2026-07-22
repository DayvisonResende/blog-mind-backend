import sanitizeHtml from 'sanitize-html';

// Comentarios sao texto puro: remove qualquer HTML/script (anti-XSS).
export function sanitizeText(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'recursiveEscape',
  }).trim();
}
