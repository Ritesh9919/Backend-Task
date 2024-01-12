import express from 'express';
const router = express.Router();
import {createVariant, updateVariant, deleteVariant} from '../controllers/variant.controller.js';

router.post('/:productId', createVariant);
router.put('/:variantId', updateVariant);
router.delete('/:productId/:variantId', deleteVariant);


export default router;