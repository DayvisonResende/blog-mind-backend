import { randomUUID } from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs/promises';
import sharp from 'sharp';

export const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
const MAX_WIDTH = 1600;
const QUALITY = 80;

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

const AVATAR_SIZE = 256;

export async function saveAvatarImage(buffer: Buffer): Promise<string> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  const filename = `${randomUUID()}.jpg`;
  const fullPath = path.join(UPLOADS_DIR, filename);

  await sharp(buffer)
    .resize(AVATAR_SIZE, AVATAR_SIZE, { fit: 'cover' })
    .jpeg({ quality: QUALITY })
    .toFile(fullPath);

  return `/uploads/${filename}`;
}

// So remove imagens locais; ignora URLs externas (ex.: avatares de seed).
export async function deleteUploadedImage(publicPath: string | null): Promise<void> {
  if (!publicPath || !publicPath.startsWith('/uploads/')) return;
  const filename = path.basename(publicPath);
  await fs.rm(path.join(UPLOADS_DIR, filename), { force: true });
}

export const deleteCoverImage = deleteUploadedImage;
