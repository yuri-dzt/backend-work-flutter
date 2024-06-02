import { type Request, type Response } from 'express'
import { getAllClientsModel } from '../../models/clients/getClientsModel'
import { cache } from '../../services/nodeCache'

export async function getAllClientsController (req: Request, res: Response) {
  try {
    console.log('Dados da requisição')
    const clients = await getAllClientsModel()
    cache.set(req.originalUrl, clients)
    res.status(200).json(clients)
  } catch (err) {
    res.status(500).json({ message: 'Erro ao pegar clientes', error: (err as Error).message })
  }
}
