import { type Request, type Response } from 'express'
import { createClientModel } from '../../models/clients/createClientModel'
import { cache } from '../../services/nodeCache'

export async function createClientController (req: Request, res: Response) {
  try {
    const { nome, sobrenome, email, idade } = req.body

    const newClient = await createClientModel({ name: nome, lastname: sobrenome, email, age: idade })
    res.status(201).send(newClient)
    const data = cache.del('/api/clients')
    console.log('cache atualizado', data)
  } catch (err) {
    console.error('Erro ao criar cliente:', err)
    res.status(500).send('Erro ao criar cliente: ' + (err as Error).message)
  }
}
