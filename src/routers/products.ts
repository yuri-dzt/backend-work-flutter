import express from 'express'
import { CreateProductController } from '../controllers/products/createProductController'
import { GetAllProductsController } from '../controllers/products/getAllproductsController'
import { DeleteProductController } from '../controllers/products/deleteProductController'
import { ChangeProductController } from '../controllers/products/changeProductController'
import { cacheMiddleware } from '../middlewares/cache'

const router = express.Router()

router.post('/poducts', CreateProductController)
router.get('/products', cacheMiddleware, GetAllProductsController)
router.delete('/products/:id', DeleteProductController)
router.put('/products/:productId', ChangeProductController)

export default router
