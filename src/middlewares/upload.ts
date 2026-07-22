import multer from 'multer';
import { AppError } from '../utils/AppError';

const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Armazenamento em memoria: o arquivo chega como buffer para o sharp processar.
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

export const uploadCover = uploadImage('coverImage');
export const uploadAvatar = uploadImage('avatar');
