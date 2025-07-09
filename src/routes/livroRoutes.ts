import { Router } from 'express';

// IMPORTAÇÃO NOMEADA, com chaves e com 'l' minúsculo
import { livroController } from '../controllers/livroController';

const router = Router();

// USO com 'l' minúsculo
router.post('/', livroController.criar);
router.get('/', livroController.listar);
router.get('/:id', livroController.buscarPorId);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);

export default router;