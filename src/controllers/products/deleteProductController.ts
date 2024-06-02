import { type Request, type Response } from 'express'
import DeleteProductModel from '../../models/products/deleteProductModel'

export async function DeleteProductController (req: Request, res: Response) {
  try {
    const { id } = req.params
    const response = await DeleteProductModel(id)
    res.status(200).json({
      message: response
    })
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message
    })
  }
}
