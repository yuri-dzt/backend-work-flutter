import { type Request, type Response } from 'express'
import ChangeClientModel from '../../models/clients/changeClientModel'
import { cache } from '../../services/nodeCache'

export async function ChangeCLientController (req: Request, res: Response) {
  try {
    const { clientId } = req.params
    const { name, lastName, age } = req.body
    const response = await ChangeClientModel(clientId, { name, lastName, age })
    const data = cache.del('/api/clients')
    console.log('cache atualizado', data)
    res.status(200).json({
      message: response
    })
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message
    })
  }
}
