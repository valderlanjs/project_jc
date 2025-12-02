import express from 'express';
import { heroController } from '../controllers/heroController.js';
import { upload, handleUploadError } from '../middleware/upload.js';
import { validateHeroContent } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/hero - Buscar conteúdo do hero (público)
router.get('/', heroController.getHeroContent);

// PUT /api/hero/:id - Atualizar conteúdo do hero (protegido)
router.put('/:id', authenticateToken, validateHeroContent, heroController.updateHeroContent);

// PUT /api/hero/:id/background - Atualizar imagem de fundo (protegido)
router.put(
  '/:id/background',
  authenticateToken,
  upload.single('backgroundImage'),
  handleUploadError,
  heroController.updateHeroBackground
);

// POST /api/hero - Criar novo conteúdo do hero (protegido)
router.post('/', authenticateToken, validateHeroContent, heroController.createHeroContent);

export default router;