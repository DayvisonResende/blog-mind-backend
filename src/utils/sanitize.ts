import sanitizeHtml from 'sanitize-html';

/**
 * Sanitiza texto de comentario removendo qualquer HTML/script (anti-XSS).
 * Os comentarios sao texto puro (textarea no Figma), entao nao permitimos
 * nenhuma tag. Preserva o texto, mas neutraliza `<script>`, `<img onerror>` etc.
 */
export function sanitizeText(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'recursiveEscape',
  }).trim();
}
