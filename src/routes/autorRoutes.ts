// src/routes/autorRoutes.ts
import { Router } from 'express';
// A importação deve ser NOMEADA, usando chaves
import { autorController } from '../controllers/autorController';

const router = Router();

router.post('/', autorController.criar);
router.get('/', autorController.listar);
router.get('/:id', autorController.buscarPorId);
router.put('/:id', autorController.atualizar);
router.delete('/:id', autorController.deletar);

export default router;