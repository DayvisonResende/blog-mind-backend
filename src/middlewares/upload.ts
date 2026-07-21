import multer from 'multer';
import { AppError } from '../utils/AppError';

/** Tipos de imagem aceitos para a capa do artigo. */
const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp'];

/** Tamanho maximo do upload antes do processamento (5 MB). */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Multer com armazenamento em memoria: o arquivo chega como buffer
 * para ser processado/comprimido pelo sharp antes de salvar em disco.
 * Valida o tipo (mimetype) e o tamanho antes de aceitar.
 */
export const uploadCover = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
      cb(new AppError('Formato de imagem invalido (use JPEG, PNG ou WebP)', 422, 'INVALID_IMAGE'));
      return;
    }
    cb(null, true);
  },
}).single('coverImage');
