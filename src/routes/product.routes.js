import express from 'express';
const router = express.Router();

import {createProduct, getProduct, getProducts, updateProduct, deleteProduct} from '../controllers/product.controller.js';

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);


export default router;