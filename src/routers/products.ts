import express from 'express'
import { CreateProductController } from '../controllers/products/createProductController'
import { GetAllProductsController } from '../controllers/products/getAllproductsController'
import { DeleteProductController } from '../controllers/products/deleteProductController'
import { ChangeProductController } from '../controllers/products/changeProductController'

const router = express.Router()

router.post('/products', CreateProductController)
router.get('/products', GetAllProductsController)
router.delete('/products/:id', DeleteProductController)
router.put('/products/:productId', ChangeProductController)

export default router
