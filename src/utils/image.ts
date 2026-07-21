import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';

/** Pasta onde as capas processadas sao salvas (fora do controle do Git). */
export const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');

/** Largura maxima da capa apos o redimensionamento. */
const MAX_WIDTH = 1600;

/** Qualidade da compressao JPEG. */
const QUALITY = 80;

/**
 * Comprime e redimensiona a imagem de capa com sharp e salva em disco,
 * retornando o caminho publico (ex.: "/uploads/uuid.jpg") para gravar no banco.
 * - Redimensiona para no maximo 1600px de largura (sem ampliar imagens menores).
 * - Converte para JPEG com qualidade ~80 (dump/banco mais leves).
 */
export async function saveCoverImage(buffer: Buffer): Promise<string> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const filename = `${randomUUID()}.jpg`;
  const fullPath = path.join(UPLOADS_DIR, filename);

  await sharp(buffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY })
    .toFile(fullPath);

  return `/uploads/${filename}`;
}

/** Remove uma capa do disco (ao excluir/editar artigo). Ignora se nao existir. */
export async function deleteCoverImage(publicPath: string | null): Promise<void> {
  if (!publicPath) return;
  const filename = path.basename(publicPath);
  await fs.rm(path.join(UPLOADS_DIR, filename), { force: true });
}
