import multer from 'multer';
import { AppError } from '../utils/AppError';

/** Tipos de imagem aceitos para a capa do artigo. */
const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Tamanho maximo do upload antes do processamento (5 MB). */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Cria um middleware multer (memoria) para um unico arquivo de imagem no
 * campo informado. O arquivo chega como buffer para o sharp processar antes
 * de salvar em disco. Valida o tipo (mimetype) e o tamanho antes de aceitar.
 */
function uploadImage(field: string) {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (_req, file, cb) => {
      if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
        cb(new AppError('Formato de imagem inválido (use JPEG, PNG ou WebP)', 422, 'INVALID_IMAGE'));
        return;
      }
      cb(null, true);
    },
  }).single(field);
}

/** Upload da capa do artigo (campo "coverImage"). */
export const uploadCover = uploadImage('coverImage');

/** Upload da foto de perfil (campo "avatar"). */
export const uploadAvatar = uploadImage('avatar');
