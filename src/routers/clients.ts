import express from 'express'
import { createClientController } from '../controllers/clients/createClientController'
import { getAllClientsController } from '../controllers/clients/getAllClientsController'
import { DeleteClientController } from '../controllers/clients/deleteClientController'
import { ChangeCLientController } from '../controllers/clients/changeClientController'
import { cacheMiddleware } from '../middlewares/cache'

const router = express.Router()

router.post('/clients', createClientController)
router.get('/clients', cacheMiddleware, getAllClientsController)
router.delete('/clients/:id', DeleteClientController)
router.put('/clients/:clientId', ChangeCLientController)

export default router
